from rest_framework import serializers
from .models import Tag, Post, Highlight
from django.conf import settings


class CustomOwnerField(serializers.RelatedField):
    def to_representation(self, value):
        return {'id': value.id, 'username': value.username, 'bio': value.profile.bio}

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, slug_field="name", queryset=Tag.objects.all())
    owner = CustomOwnerField(read_only=True)
    image_url = serializers.SerializerMethodField("get_image_url")

    class Meta:
        model = Post
        fields = "__all__"
        
    def get_image_url(self, obj):
        if obj.image and obj.image.name != "1":
            url = obj.image.url
            url = url.split(obj.image.name)[0] + obj.image.name
            return url
        else:
            if obj.content_type == "Podcast":
                return f"http://{settings.AWS_S3_CUSTOM_DOMAIN}/{settings.AWS_LOCATION}/default_podcast.jpg" 
            elif obj.content_type == "Youtube":
                return f"http://{settings.AWS_S3_CUSTOM_DOMAIN}/{settings.AWS_LOCATION}/default_youtube.jpg" 
            else:
                return f"http://{settings.AWS_S3_CUSTOM_DOMAIN}/{settings.AWS_LOCATION}/default_blog.jpg" 

class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlight
        fields = "__all__"
    
    
   

    