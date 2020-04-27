from rest_framework import routers
from .api import TagViewSet, UserContentView, LikeViewSet, PostViewSet

router = routers.DefaultRouter()
router.register('tags', TagViewSet, 'tags'),
router.register('likes', LikeViewSet, 'likes'),
router.register('posts', PostViewSet, 'posts'),
router.register('user', UserContentView, 'user-posts')

urlpatterns = router.urls