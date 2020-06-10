from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/content/', include('usercontent.urls')),
    path('api/auth/', include('users.urls')),
    path('', include('frontend.urls')),
]

if settings.ENVIRONMENT == 'development':
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                            document_root=settings.MEDIA_ROOT)