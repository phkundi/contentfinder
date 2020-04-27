from django.contrib import admin
from .models import Tag, Like, Post

# Register your models here.
admin.site.register(Tag)
admin.site.register(Like)
admin.site.register(Post)