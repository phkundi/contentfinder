from rest_framework import routers
from .api import BlogViewSet, TagViewSet, PodcastViewSet, YoutubeViewSet, AllContentsView, UserContentView, LikeViewSet
from django.urls import path

router = routers.DefaultRouter()
router.register('blogs', BlogViewSet, 'blogs'),
router.register('tags', TagViewSet, 'tags'),
router.register('podcasts', PodcastViewSet, 'podcasts'),
router.register('youtube', YoutubeViewSet, 'youtube'),
router.register('likes', LikeViewSet, 'likes')

urlpatterns = [
    path('all/', AllContentsView.as_view(), name="all"),
    path('user/', UserContentView.as_view(), name="user-content")
] 

urlpatterns += router.urls