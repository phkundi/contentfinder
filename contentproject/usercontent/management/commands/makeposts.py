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
adjectives = ["Amazing", "Cool", "Dry", "Horny", "Shy", "Wild", "Lonely", "Crazy", "Embarassing", "High", "Hot", "Cold", "Dark", "Bright", "Addictive"]
words = ["Airplane", "Hangglider", "Phone", "Message", "Code", "Time", "Watch", "Space", "Bottle", "Lamp", "Keyboard", "Hack", "Girl", "Boy", "Grandma", "Grandpa"]
verbs = ["Playing", "Singing", "Fucking", "Kissing", "Cuddling", "Drinking", "Eating", "Sitting", "Walking", "Crying", "Laughing"]
locations = ["in Space", "at Home", "in Bed", "in the Car", "at School", "in the Gym", "by the Sea", "in the Grave"]

def randomword(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

class Command(BaseCommand):    
    def handle(self, *args, **kwargs):            
        for tag in tags:
            Tag.objects.get_or_create(
                name=tag
            )

        for i in range(300):
            url = f"http://{randomword(10)}.com"
            description= f"{adjectives[random.randrange(0, len(adjectives))]} {words[random.randrange(0, len(words))]} {verbs[random.randrange(0, len(verbs))]} {locations[random.randrange(0, len(locations))]}"
            name = f"{content_types[random.randint(0,len(content_types)-1)]} #{random.randint(1,1000)}"
            post = Post.objects.create(
                owner=user,
                content_type=content_types[random.randint(0,len(content_types)-1)],
                description=description,
                name=name,
                url=url,
            )
            tag = Tag.objects.order_by("?").first()
            post.tags.add(tag)
            
            post.save()

    
    



    
