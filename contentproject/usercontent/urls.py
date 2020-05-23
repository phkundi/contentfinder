from django.urls import path
from rest_framework import routers
from .api import TagViewSet, UserContentView, PostViewSet, InfinitePostViewSet, SearchAPI, UserLikes, HighlightViewSet

router = routers.DefaultRouter()
router.register('tags', TagViewSet, 'tags'),
router.register('posts', PostViewSet, 'posts'),
router.register('user', UserContentView, 'user-posts'),
router.register('posts-infinite', InfinitePostViewSet, 'infinite'),
router.register('highlights', HighlightViewSet, 'highlights')

urlpatterns = [
    path('search/', SearchAPI.as_view(), name='search'),
    path('user/liked/', UserLikes.as_view(), name="user-likes")
]

urlpatterns += router.urls