from django.urls import path
from rest_framework import routers
from .api import TagViewSet, UserContentView, LikeViewSet, PostViewSet, InfinitePostViewSet, SearchAPI

router = routers.DefaultRouter()
router.register('tags', TagViewSet, 'tags'),
router.register('likes', LikeViewSet, 'likes'),
router.register('posts', PostViewSet, 'posts'),
router.register('user', UserContentView, 'user-posts'),
router.register('posts-infinite', InfinitePostViewSet, 'infinite'),

urlpatterns = [
    path('search/', SearchAPI.as_view(), name='search')
]

urlpatterns += router.urls