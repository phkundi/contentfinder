from rest_framework import routers
from .api import BlogViewSet, TagViewSet, PodcastViewSet, YoutubeViewSet, AllContentsView
from django.urls import path

router = routers.DefaultRouter()
router.register('blogs', BlogViewSet, 'blogs'),
router.register('tags', TagViewSet, 'tags'),
router.register('podcasts', PodcastViewSet, 'podcasts'),
router.register('youtube', YoutubeViewSet, 'youtube'),

urlpatterns = [
    path('all/', AllContentsView.as_view(), name="all")
]

urlpatterns += router.urls