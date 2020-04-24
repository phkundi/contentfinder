from .models import Blog, Tag, Podcast, YoutubeChannel
from rest_framework import viewsets, permissions
from .serializers import BlogSerializer, TagSerializer, YoutubeChannelSerializer, PodcastSerializer
from drf_multiple_model.views import FlatMultipleModelAPIView

class TagViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TagSerializer

    def get_queryset(self):
        return Tag.objects.all()
        
class BlogViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BlogSerializer

    def get_queryset(self):
        return Blog.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PodcastViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PodcastSerializer

    def get_queryset(self):
        return Podcast.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class YoutubeChannelViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = YoutubeChannelSerializer

    def get_queryset(self):
        return YoutubeChannel.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class AllContentsView(FlatMultipleModelAPIView):
    querylist = [
        {'queryset': Blog.objects.all(), 'serializer_class': BlogSerializer},
        {'queryset': Podcast.objects.all(), 'serializer_class': PodcastSerializer},
        {'queryset': YoutubeChannel.objects.all(), 'serializer_class': YoutubeChannelSerializer},
    ]