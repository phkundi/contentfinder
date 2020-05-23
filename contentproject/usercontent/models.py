import uuid
from django.db import models
from django.contrib.auth.models import User

TYPE_CHOICES = (
    ('Blog', "Blog"),
    ('Podcast', 'Podcast'),
    ('Youtube', 'Youtube'),
)

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, related_name="posts")
    url = models.URLField(max_length=250, unique=True)
    owner = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    content_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    added = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name="likes", blank=True)
    image = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.name

class Highlight(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    url = models.CharField(max_length=150, unique=True)
    owner = models.ForeignKey(User, related_name="highlights", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="highlights", on_delete=models.CASCADE)

    def __str__(self):
        return self.title