from django.contrib import admin
from .models import Blog, Tag, Podcast, YoutubeChannel
# Register your models here.
admin.site.register(Blog)
admin.site.register(Tag)
admin.site.register(Podcast)
admin.site.register(YoutubeChannel)