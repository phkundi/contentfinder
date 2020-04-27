import uuid
from django.db import models
from django.contrib.auth.models import User

TYPE_CHOICES = (
    ('Blog', "Blog"),
    ('Podcast', 'Podcast'),
    ('Youtube', 'Youtube'),
    ('Other', 'Other')
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
    content_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="other")

    def __str__(self):
        return self.name
    
    def get_total_likes(self):
        return self.likes.count()
    

class Like(models.Model):
    user = models.ForeignKey(User, related_name="likes", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="likes", blank=True, null=True, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Like by {self.user.username}'