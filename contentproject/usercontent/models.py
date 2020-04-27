import uuid
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Blog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, related_name="blogs")
    url = models.URLField(max_length=250, unique=True)
    owner = models.ForeignKey(User, related_name="blogs", on_delete=models.CASCADE)
    slug = models.CharField(max_length=20, default="blogs")

    def __str__(self):
        return self.name
    
    def get_total_likes(self):
        return self.likes.count()

class Podcast(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, related_name="podcasts")
    url = models.URLField(max_length=250, unique=True)
    owner = models.ForeignKey(User, related_name="podcasts", on_delete=models.CASCADE)
    slug = models.CharField(max_length=20, default="podcasts")

    def __str__(self):
        return self.name
    
    def get_total_likes(self):
        return self.likes.count()

class Youtube(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, related_name="youtube_channels")
    url = models.URLField(max_length=250, unique=True)
    owner = models.ForeignKey(User, related_name="youtube_channels", on_delete=models.CASCADE)
    slug = models.CharField(max_length=20, default="youtube")

    def __str__(self):
        return self.name
    
    def get_total_likes(self):
        return self.likes.count()

class Like(models.Model):
    user = models.ForeignKey(User, related_name="likes", on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog, related_name="likes", blank=True, null=True, on_delete=models.CASCADE)
    podcast = models.ForeignKey(Podcast, related_name="likes", blank=True, null=True, on_delete=models.CASCADE)
    youtube = models.ForeignKey(Youtube, related_name="likes", blank=True, null=True, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Like by {self.user.username}'