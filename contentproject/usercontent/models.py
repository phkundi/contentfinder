from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Blog(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, related_name="blogs")
    url = models.URLField(max_length=250)
    owner = models.ForeignKey(User, related_name="blogs", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Podcast(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, related_name="podcasts")
    url = models.URLField(max_length=250)
    owner = models.ForeignKey(User, related_name="podcasts", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class YoutubeChannel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True, related_name="youtube_channels")
    url = models.URLField(max_length=250)
    owner = models.ForeignKey(User, related_name="youtube_channels", on_delete=models.CASCADE)

    def __str__(self):
        return self.name