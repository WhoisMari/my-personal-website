from django.db import models

# Create your models here.

class Tag(models.Model):
	title = models.CharField(max_length=64)
	def __str__(self):
		return self.title

class Post(models.Model):
	title = models.CharField(max_length=200)
	slug = models.SlugField()
	thumbnail = models.FileField(upload_to="thumbnails/", blank=True)
	intro = models.TextField(blank=True)
	content = models.TextField()
	timestamp = models.DateTimeField(auto_now_add=True)
	tags = models.ManyToManyField(Tag, blank=True)

	class Meta:
		ordering = ['-timestamp']

	def __str__(self):
		return self.title

class Certificate(models.Model):
	title = models.CharField(max_length=200)
	certificate = models.FileField(upload_to="certifications/")
	description = models.TextField(blank=True)
	timestamp = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-timestamp']

	def __str__(self):
		return self.title

class Project(models.Model):
	title = models.CharField(max_length=120)
	thumbnail = models.FileField(upload_to="projects-thumbnails/", blank=True)
	content =  models.TextField()
	github = models.URLField()
	link = models.URLField()
	timestamp = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-timestamp']

	def __str__(self):
		return self.title

class ProjectImage(models.Model):
	image = models.FileField(upload_to="projects/")
	caption = models.TextField(blank=True)
	project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')