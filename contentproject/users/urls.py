from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, ProfileAPI
from knox import views as knox_views

urlpatterns = [
  path('register/', RegisterAPI.as_view()),
  path('login/', LoginAPI.as_view()),
  path('user/', UserAPI.as_view()),
  path('profiles/<user>', ProfileAPI.as_view()),
  path('logout/', knox_views.LogoutView.as_view(), name="knox-logout"),
  path('', include('knox.urls')),
]