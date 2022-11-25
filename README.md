# WhoisMari - Personal Website

This is my personal [website](https://whoismari.dev) which features some of my GitHub projects as well as my technical skills and a few blog posts.

This project was built with Python, on top of Django and its Django REST framework, and JavaScript on top of the ReactJS library, using Styled Components.

# Customizing it

Feel free to fork this project and customize it with your own information and style :)

If you improve this project in any way - please let me know!

# Installation

Requirements:
- Python 3.9.5
- Node.js 16.17.0

Clone this repository and run the commands:

```py
# Clone this repository
$ git clone https://github.com/WhoisMari/my-personal-website.git

# Create a virtualenv (optional) 
$ python -m venv myvirtualenv 

# Activate your just created virtualenv (optional)
$ myvirtualenv\Scripts\activate.bat # On Windows
$ source myvirtualenv/bin/activate # On Unix and MacOs

# Install dependencies 
$ pip install -r requirements.txt
$ npm install
```

Create your *.env* file on Django's project directory (backend)

- You should generate a SECRET_KEY for your Django project. It can be done [here](https://djecrety.ir/);
- Configure the Debug as you wish (True or False);
- Add your database url;
- Add your ALLOWED_HOSTS configuration (I used "localhost:8000" for production).

Edit the *config.json* file, in the *src* directory:

```json
{
	"aws_url": "https://my-bucket.s3.amazonaws.com",
	"server_url": "http://localhost:8000/api"
}
```

As for the AWS section, if you already have an AWS account and an S3 bucket that you'd like to use, great. Just add your credentials, bucket name, and URL. or if there's other service you'd like to use, just add your configuration and go for it!


But if you just want to run it locally, without the AWS storage, you can do so using the following:
- Go to your Django app (whoismari) and in *models.py* change the following:
	```py
	class Post(models.Model): 
		thumbnail = models.ImageField(upload_to='your_upload_path/', blank=True)

	class Project(models.Model):
		thumbnail = models.ImageField(upload_to='your_upload_path/', blank=True)

	class Project(models.Model):
		image = models.ImageField(upload_to='your_upload_path/')
	``` 
- Run the migrations:
	```py 
	$ python manage.py makemigrations
	$ python manage.py migrate
	``` 
- Go into *backend/settings.py* and change your media root:
	 ```py
	MEDIA_URL = '/your_upload_path/'
	STATIC_ROOT = BASE_DIR / 'your_upload_path' 
	STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage' # delete this line
	```

And you should be good to go!