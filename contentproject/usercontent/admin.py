from django.contrib import admin
from .models import Tag, Post, Highlight

# Register your models here.
admin.site.register(Tag)
admin.site.register(Post)
admin.site.register(Highlight)