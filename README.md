# contentfinder
App for posting and finding content from independent creators

# Instructions:
## Install dependencies
`pip install -r requirements.txt`

For frontend development: `npm install`

## Go into project folder 
`cd contentproject`

## Initialize database 
`python manage.py migrate`

## Create superuser 
`python manage.py createsuperuser`

## Fill database with dummy content 
`python manage.py makeposts`

## Run server 
`python manage.py runserver`
