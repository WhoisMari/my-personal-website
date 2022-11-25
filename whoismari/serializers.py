from rest_framework import serializers
from .models import Post, Project, ProjectImage, Tag, Certificate

class TagSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tag
		fields = ('__all__')

class PostSerializer(serializers.ModelSerializer):
	tags = TagSerializer(read_only=True, many=True)
	class Meta:
		model = Post
		fields = ('__all__')

class CertificateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Certificate
		fields = ('__all__')

class ProjectSerializer(serializers.ModelSerializer):
	class Meta:
		model = Project
		fields = ('__all__')

class ProjectImageSerializer(serializers.ModelSerializer):
	project = ProjectSerializer(read_only=True)
	class Meta:
		model = ProjectImage
		fields = ('id', 'image', 'project', 'caption')