from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ProfileSerializer
from .models import Profile
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.http import JsonResponse

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API
class LoginAPI(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Get and Update User API
class UserAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer


    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)
    
    def delete(self, request, *args, **kwargs):
        user = self.request.user
        user.delete()
        return Response(None)
    
    def update(self, request, *args, **kwargs):
        user_data = request.data['user']
        profile_data = request.data['profile']

        # make sure user enters a email address
        if not user_data["email"]:
            response = {
                "email": ["This field may not be blank"]

            }
            return JsonResponse(response, status=502)

        user_serializer = self.serializer_class(request.user, data=user_data, partial=True)
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()

        if profile_data:
            profile_serializer_class = ProfileSerializer
            user_profile = request.user.profile
            profile_serializer = ProfileSerializer(user_profile, data=profile_data, partial=True)
            profile_serializer.is_valid(raise_exception=True)
            profile_serializer.save()
        
        # response = {'user': user_serializer.data, 'profile': profile_serializer.data}
        return Response(user_serializer.data)

# UserProfile API
class ProfileAPI(generics.RetrieveAPIView):
    lookup_field = 'user'
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()