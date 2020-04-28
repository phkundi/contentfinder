from .models import Tag, Like, Post
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import TagSerializer, LikeSerializer, PostSerializer

class TagViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = TagSerializer

    def get_queryset(self):
        return Tag.objects.all()

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

def infinite_filter(request):
    queryset = Post.objects.all()
    limit = request.GET.get("limit")
    offset = request.GET.get("offset")
    content_type = request.GET.get("content", None)
    if content_type is not None:
        queryset = queryset.filter(content_type=content_type)
    return queryset[int(offset):int(offset)+int(limit)]

def is_there_more_data(request):
    content_type = request.query_params.get('content', None)
    offset = request.GET.get('offset')
    if content_type is not None:
        if int(offset) > Post.objects.filter(content_type=content_type).count():
            return False
    else:
        if int(offset) > Post.objects.all().count():
            return False
    return True

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
        
class UserContentView(viewsets.ModelViewSet):
    permission_classes = [
            permissions.IsAuthenticatedOrReadOnly
        ]
    serializer_class = PostSerializer
    
    def get_queryset(self):
        return Post.objects.filter(owner=self.request.user)