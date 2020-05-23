from .models import Tag, Post, Highlight
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from .serializers import TagSerializer, PostSerializer, HighlightSerializer
from django.db.models import Q, Count

# Tags
class TagViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = TagSerializer

    def get_queryset(self):
        return Tag.objects.all()

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
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        post_serializer = self.serializer_class(instance)
        highlight_queryset = Highlight.objects.filter(post=instance)
        highlight_serializer = HighlightSerializer(highlight_queryset, many=True)
        return Response({'post': post_serializer.data, 'highlights': highlight_serializer.data})

class HighlightViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = HighlightSerializer
    queryset = Highlight.objects.all()

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# Infinite Posts Methods

# Get required slice of content
def infinite_filter(request):
    # query information
    limit = request.GET.get("limit")
    offset = request.GET.get("offset")
    content_type = request.GET.get("type")
    search_query = request.GET.get("search")
    filter_query = request.GET.get("filter")
    sort_query = request.GET.get("sort")
    
    # initial queryset
    queryset = Post.objects.all()

    # if user is looking for specific type of content (Blog, Podcast, Youtube)
    if content_type and content_type != "null":
        queryset = queryset.filter(content_type=content_type)

    # If user entered a search term
    elif search_query and search_query != "null":
        queryset = queryset.filter(
            Q(name__icontains=search_query) | 
            Q(owner__username__contains=search_query) | 
            Q(tags__name__contains=search_query)
        )

    # if, in addition to the above, user set tag filter
    if filter_query and filter_query != "null":
        queryset = queryset.filter(tags__name=filter_query)
    
    if sort_query and sort_query != "null":
        # does not work
        if sort_query == "Newest":
            queryset = queryset.order_by("-added")
        # Sort by Likes
        elif sort_query == "Most Popular":
            queryset = queryset.annotate(like_count=Count('likes')).order_by('-like_count')

    # slice the queryset
    return queryset[int(offset):int(offset)+int(limit)]

def is_there_more_data(request):
    # query information
    content_type = request.query_params.get('type', None)
    offset = request.GET.get('offset')
    search_query = request.GET.get("search", None)
    filter_query = request.GET.get("filter", None)

    # If user is looking for a specific content type
    if content_type and content_type != "null":
        results = Post.objects.filter(content_type=content_type).count()
        if int(offset) > results:
            return False

        # If user has also specified filter query
        if filter_query and filter_query != "null":
            results = Post.objects.filter(Q(tags__name=filter_query) & Q(content_type=content_type)).count() 
            if int(offset) > results:
                return False

    # If user is searching
    elif search_query and search_query != "null":
        results = Post.objects.filter(
            Q(name__icontains=search_query) | 
            Q(owner__username__contains=search_query) | 
            Q(tags__name__contains=search_query)
        ).count()
        if int(offset) > results:
            return False
    # If there is a filter set

    if filter_query and filter_query != "null":
        results = Post.objects.filter(tags__name=filter_query).count()
        if int(offset) > results:
            return False

    # If user is querying all posts
    else:
        if int(offset) > Post.objects.all().count():
            return False

    # If offset is bigger than any of the above, return True for more Data
    return True

# Infinite Posts Viewset
class InfinitePostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = PostSerializer

    # Get queryset from infinite filter method
    def get_queryset(self):
        queryset = infinite_filter(self.request)
        return queryset
    
    # overwrite list method to include has_more in the response
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

# Get content liked by the user
class UserLikes(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.filter(likes__id=self.request.user.id)
        return queryset


# Search without infinite scroll - not currently used anywhere
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