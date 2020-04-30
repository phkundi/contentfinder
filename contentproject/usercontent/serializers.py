from rest_framework import serializers
from .models import Tag, Post


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

    class Meta:
        model = Post
        fields = "__all__"
    

    
    
    
   

    