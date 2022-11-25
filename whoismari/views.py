from .models import Post, Project, ProjectImage, Certificate
from .serializers import PostSerializer, ProjectImageSerializer, ProjectSerializer, CertificateSerializer
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, JSONParser
from rest_framework.response import Response
# Create your views here.


class BlogView(APIView):
	parser_classes = (JSONParser, FormParser)
	def get(self, request, *args, **kwargs):
		qs_posts = Post.objects.exclude(slug='about').all()
		qs_posts = qs_posts.exclude(slug='my-skills')
		serializer = PostSerializer(qs_posts, many=True)
		return Response(serializer.data)

class PostView(APIView):
	parser_classes = (JSONParser, FormParser)
	def get(self, request, *args, **kwargs):
		post = Post.objects.get(slug=kwargs['slug'])
		serializer = PostSerializer(post)
		return Response(serializer.data)

class CertificateView(APIView):
	parser_classes = (JSONParser, FormParser)
	def get(self, request, *args, **kwargs):
		qs_certificates = Certificate.objects.all()
		serializer = CertificateSerializer(qs_certificates, many=True)
		return Response(serializer.data)

class AboutView(APIView):
	parser_classes = (JSONParser, FormParser)
	def get(self, request, *args, **kwargs):
		about = Post.objects.get(title='About Me')
		serializer = PostSerializer(about)
		return Response(serializer.data)

class MySkillsView(APIView):
	parser_classes = (JSONParser, FormParser)
	def get(self, request, *args, **kwargs):
		skills = Post.objects.get(title='My Skills')
		serializer = PostSerializer(skills)
		return Response(serializer.data)

class ProjectView(APIView):
	parser_classes = (JSONParser, FormParser)
	def get(self, request, *args, **kwargs):
		qs_projects = Project.objects.all()
		serializer = ProjectSerializer(qs_projects, many=True)
		return Response(serializer.data)

class ProjectImagesView(APIView):
	parser_classes = (JSONParser, FormParser)
	def get(self, request, *args, **kwargs):
		project = Project.objects.get(id=kwargs['project_id'])
		qs_images = ProjectImage.objects.filter(project=project)
		serializer = ProjectImageSerializer(qs_images, many=True)
		return Response(serializer.data)