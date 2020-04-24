from rest_framework import routers
from .api import BlogViewSet, TagViewSet, PodcastViewSet, YoutubeChannelViewSet, AllContentsView
from django.urls import path

router = routers.DefaultRouter()
router.register('blogs', BlogViewSet, 'blogs'),
router.register('tags', TagViewSet, 'tags'),
router.register('podcasts', PodcastViewSet, 'podcasts'),
router.register('youtube', YoutubeChannelViewSet, 'youtube-channels'),

urlpatterns = [
    path('all/', AllContentsView.as_view(), name="all")
]

urlpatterns += router.urls