from .models import Tag, Like, Post
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from .serializers import TagSerializer, LikeSerializer, PostSerializer
from django.db.models import Q

# Tags
class TagViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = TagSerializer

    def get_queryset(self):
        return Tag.objects.all()

# Likes
class LikeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = LikeSerializer

    def get_queryset(self):
        queryset = Like.objects.all()
        post_id = self.request.query_params.get('post_id', None)
        if post_id is not None:
            queryset = queryset.filter(post=post_id)
        user_id = self.request.query_params.get('user_id', None)
        if user_id is not None:
            queryset = queryset.filter(user=user_id)
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Posts without infinite scroll
class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        content_type = self.request.query_params.get('content', None)
        if content_type is not None:
            queryset = queryset.filter(content_type=content_type)
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Infinite Posts Methods
def infinite_filter(request):
    queryset = Post.objects.all()
    limit = request.GET.get("limit")
    offset = request.GET.get("offset")
    content_type = request.GET.get("content", None)
    search_query = request.GET.get("q", None)
    if content_type:
        queryset = queryset.filter(content_type=content_type)
    elif search_query:
        queryset = queryset.filter(
            Q(name__icontains=search_query) | 
            Q(owner__username__contains=search_query) | 
            Q(tags__name__contains=search_query)
        )

    return queryset[int(offset):int(offset)+int(limit)]

def is_there_more_data(request):
    content_type = request.query_params.get('content', None)
    offset = request.GET.get('offset')
    search_query = request.GET.get("q", None)
    # If user is looking for a specific content type
    if content_type:
        if int(offset) > Post.objects.filter(content_type=content_type).count():
            return False
    # If user is searching
    elif search_query:
        results = Post.objects.filter(
            Q(name__icontains=search_query) | 
            Q(owner__username__contains=search_query) | 
            Q(tags__name__contains=search_query)
        ).count()
        if int(offset) > results:
            return False
    # If user is querying all posts
    else:
        if int(offset) > Post.objects.all().count():
            return False
    return True

# Infinite Posts Viewset
class InfinitePostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = infinite_filter(self.request)
        return queryset
        
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "content": serializer.data,
            "has_more": is_there_more_data(request)
        })

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Get only the current users content   
class UserContentView(viewsets.ModelViewSet):
    permission_classes = [
            permissions.IsAuthenticatedOrReadOnly
        ]
    serializer_class = PostSerializer
    
    def get_queryset(self):
        return Post.objects.filter(owner=self.request.user)

# Search without infinite scroll
def search_filter(request):
    search_query = request.query_params.get("q", None)
    if search_query is not None:
        queryset = Post.objects.filter(
            Q(name__icontains=search_query) | 
            Q(owner__username__contains=search_query) | 
            Q(tags__name__contains=search_query)
        )
        return queryset
    return None

class SearchAPI(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        queryset = search_filter(self.request)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        if queryset:
           return Response(
               serializer.data
            )
        return Response(None)