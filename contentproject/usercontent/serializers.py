from rest_framework import serializers
from .models import Blog, Tag, Podcast, YoutubeChannel

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class BlogSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")
    owner = serializers.SlugRelatedField(read_only=True, slug_field="username")
    class Meta:
        model = Blog
        fields = "__all__"

class PodcastSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")
    owner = serializers.SlugRelatedField(read_only=True, slug_field="username")
    class Meta:
        model = Podcast
        fields = "__all__"

class YoutubeChannelSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")
    owner = serializers.SlugRelatedField(read_only=True, slug_field="username")
    class Meta:
        model = YoutubeChannel
        fields = "__all__"