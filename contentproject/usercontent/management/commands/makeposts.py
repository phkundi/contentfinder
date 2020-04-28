from django.core.management.base import BaseCommand
from usercontent.models import Post, Tag
from django.contrib.auth.models import User
import random
import string

tags = ["Food", "Fashion", "Technology", "Travel", "Love", "Stories", "Camping", "Kids"]
user = User.objects.first()
content_types = ["Blog", "Podcast", "Youtube"]
description = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
name = "Post"

def randomword(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

class Command(BaseCommand):

    
    
    def handle(self, *args, **kwargs):
        for i in range(500):
            url = f"http://{randomword(10)}.com"
            name= f"Post #{random.randint(1,1000)}"
            post = Post(
                owner=user,
                content_type=content_types[random.randint(0,len(content_types)-1)],
                description=description,
                name=name,
                url=url      
            )
            
            post.save()
    
    



    
