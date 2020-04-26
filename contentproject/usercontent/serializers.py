from rest_framework import serializers
from .models import Blog, Tag, Podcast, Youtube
from users.serializers import ProfileSerializer

class CustomOwnerField(serializers.RelatedField):
    def to_representation(self, value):
        return {'id': value.id, 'username': value.username, 'bio': value.profile.bio}

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class BlogSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, slug_field="name", queryset=Tag.objects.all())
    owner = CustomOwnerField(read_only=True)
    class Meta:
        model = Blog
        fields = "__all__"

class PodcastSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, slug_field="name", queryset=Tag.objects.all())
    owner = CustomOwnerField(read_only=True)
    class Meta:
        model = Podcast
        fields = "__all__"

class YoutubeSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, slug_field="name", queryset=Tag.objects.all())
    owner = CustomOwnerField(read_only=True)
    class Meta:
        model = Youtube
        fields = "__all__"