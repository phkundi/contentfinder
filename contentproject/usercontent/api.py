from .models import Tag, Like, Post
from rest_framework import viewsets, permissions
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
        return Like.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        ##### NEED TO CHANGE
        permissions.AllowAny
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
        
class UserContentView(viewsets.ModelViewSet):
    permission_classes = [
            permissions.IsAuthenticatedOrReadOnly
        ]
    serializer_class = PostSerializer
    
    def get_queryset(self):
        return Post.objects.filter(owner=self.request.user)