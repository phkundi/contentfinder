from .models import Blog, Tag, Podcast, Youtube
from rest_framework import viewsets, permissions
from .serializers import BlogSerializer, TagSerializer, YoutubeSerializer, PodcastSerializer
from drf_multiple_model.views import FlatMultipleModelAPIView

class TagViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = TagSerializer

    def get_queryset(self):
        return Tag.objects.all()
        
class BlogViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = BlogSerializer

    def get_queryset(self):
        return Blog.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PodcastViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = PodcastSerializer

    def get_queryset(self):
        return Podcast.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class YoutubeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = YoutubeSerializer

    def get_queryset(self):
        return Youtube.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class AllContentsView(FlatMultipleModelAPIView):
    querylist = [
        {'queryset': Blog.objects.all(), 'serializer_class': BlogSerializer},
        {'queryset': Podcast.objects.all(), 'serializer_class': PodcastSerializer},
        {'queryset': Youtube.objects.all(), 'serializer_class': YoutubeSerializer},
    ]