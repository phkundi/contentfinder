from rest_framework import serializers
from .models import Tag, Like, Post


class CustomOwnerField(serializers.RelatedField):
    def to_representation(self, value):
        return {'id': value.id, 'username': value.username, 'bio': value.profile.bio}

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, slug_field="name", queryset=Tag.objects.all())
    get_total_likes = serializers.ReadOnlyField()
    owner = CustomOwnerField(read_only=True)
    user_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"
    
    def get_user_liked(self, obj):
        pass
        # print(self.context)
        # # request = getattr(self.context, 'request', None)
        # # user = request.user
        # # print(user)
        # # liked = obj.likes.filter(user=1).count()
        
        # # if liked:
        # #     print(True)
        # # else:
        # #     print(False)
    
    
    
   

    