from .models import Post, Project, ProjectImage, Certificate, Tag, AboutFact
from .serializers import (
    PostSerializer, ProjectImageSerializer, ProjectSerializer,
    CertificateSerializer, PostWriteSerializer, ProjectWriteSerializer,
    CertificateWriteSerializer, TagSerializer, AboutFactSerializer,
)
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser


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
		try:
			about = Post.objects.get(title='About Me')
		except Post.DoesNotExist:
			return Response({}, status=status.HTTP_404_NOT_FOUND)
		serializer = PostSerializer(about)
		return Response(serializer.data)

class MySkillsView(APIView):
	parser_classes = (JSONParser, FormParser)
	def get(self, request, *args, **kwargs):
		try:
			skills = Post.objects.get(title='My Skills')
		except Post.DoesNotExist:
			return Response({}, status=status.HTTP_404_NOT_FOUND)
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

# ── Admin CRUD views ──────────────────────────────────────────────────────────

class AdminPostListView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def get(self, request):
        posts = Post.objects.all()
        return Response(PostSerializer(posts, many=True).data)

    def post(self, request):
        serializer = PostWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminPostDetailView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def _get(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return None

    def get(self, request, pk):
        post = self._get(pk)
        if not post:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(PostSerializer(post).data)

    def put(self, request, pk):
        post = self._get(pk)
        if not post:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PostWriteSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        post = self._get(pk)
        if not post:
            return Response(status=status.HTTP_404_NOT_FOUND)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminProjectListView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def get(self, request):
        projects = Project.objects.all()
        return Response(ProjectSerializer(projects, many=True).data)

    def post(self, request):
        serializer = ProjectWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminProjectDetailView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def _get(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None

    def get(self, request, pk):
        project = self._get(pk)
        if not project:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(ProjectSerializer(project).data)

    def put(self, request, pk):
        project = self._get(pk)
        if not project:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProjectWriteSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        project = self._get(pk)
        if not project:
            return Response(status=status.HTTP_404_NOT_FOUND)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminCertificateListView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def get(self, request):
        certs = Certificate.objects.all()
        return Response(CertificateSerializer(certs, many=True).data)

    def post(self, request):
        serializer = CertificateWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminCertificateDetailView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def _get(self, pk):
        try:
            return Certificate.objects.get(pk=pk)
        except Certificate.DoesNotExist:
            return None

    def get(self, request, pk):
        cert = self._get(pk)
        if not cert:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(CertificateSerializer(cert).data)

    def put(self, request, pk):
        cert = self._get(pk)
        if not cert:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CertificateWriteSerializer(cert, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cert = self._get(pk)
        if not cert:
            return Response(status=status.HTTP_404_NOT_FOUND)
        cert.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminTagListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response(TagSerializer(Tag.objects.all(), many=True).data)

    def post(self, request):
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminProjectImageListView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, project_id):
        try:
            project = Project.objects.get(pk=project_id)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        images = ProjectImage.objects.filter(project=project)
        return Response(ProjectImageSerializer(images, many=True).data)

    def post(self, request, project_id):
        try:
            project = Project.objects.get(pk=project_id)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        image = ProjectImage(project=project, caption=request.data.get('caption', ''))
        if 'image' not in request.data:
            return Response({'image': ['No file provided.']}, status=status.HTTP_400_BAD_REQUEST)
        image.image = request.data['image']
        image.save()
        return Response(ProjectImageSerializer(image).data, status=status.HTTP_201_CREATED)


class AboutFactView(APIView):
    parser_classes = (JSONParser, FormParser)

    def get(self, request, *args, **kwargs):
        facts = AboutFact.objects.all()
        return Response(AboutFactSerializer(facts, many=True).data)


class AdminAboutFactListView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (JSONParser, FormParser)

    def get(self, request):
        return Response(AboutFactSerializer(AboutFact.objects.all(), many=True).data)

    def post(self, request):
        serializer = AboutFactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminAboutFactDetailView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (JSONParser, FormParser)

    def put(self, request, pk):
        try:
            fact = AboutFact.objects.get(pk=pk)
        except AboutFact.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = AboutFactSerializer(fact, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            fact = AboutFact.objects.get(pk=pk)
        except AboutFact.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        fact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminProjectImageDetailView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def patch(self, request, pk):
        try:
            image = ProjectImage.objects.get(pk=pk)
        except ProjectImage.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if 'caption' in request.data:
            image.caption = request.data['caption']
            image.save(update_fields=['caption'])
        return Response(ProjectImageSerializer(image).data)

    def delete(self, request, pk):
        try:
            image = ProjectImage.objects.get(pk=pk)
        except ProjectImage.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
