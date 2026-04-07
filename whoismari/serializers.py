from rest_framework import serializers
from .models import Post, Project, ProjectImage, Tag, Certificate, AboutFact


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('__all__')


def _resolve_tags(tag_names):
    """Get-or-create tags by name, filtering blanks."""
    return [
        Tag.objects.get_or_create(title=name.strip())[0]
        for name in tag_names
        if name.strip()
    ]


class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ('__all__')


class PostWriteSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = Post
        fields = ('__all__')

    def create(self, validated_data):
        tag_names = validated_data.pop('tags', [])
        instance = super().create(validated_data)
        instance.tags.set(_resolve_tags(tag_names))
        return instance

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tags', None)
        instance = super().update(instance, validated_data)
        if tag_names is not None:
            instance.tags.set(_resolve_tags(tag_names))
        return instance


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ('__all__')


class CertificateWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ('__all__')


class ProjectSerializer(serializers.ModelSerializer):
    stack_tags = TagSerializer(read_only=True, many=True)
    project_tags = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Project
        fields = ('__all__')


class ProjectWriteSerializer(serializers.ModelSerializer):
    stack_tags = serializers.ListField(child=serializers.CharField(), required=False)
    project_tags = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = Project
        fields = ('__all__')

    def create(self, validated_data):
        stack = validated_data.pop('stack_tags', [])
        proj = validated_data.pop('project_tags', [])
        instance = super().create(validated_data)
        instance.stack_tags.set(_resolve_tags(stack))
        instance.project_tags.set(_resolve_tags(proj))
        return instance

    def update(self, instance, validated_data):
        stack = validated_data.pop('stack_tags', None)
        proj = validated_data.pop('project_tags', None)
        instance = super().update(instance, validated_data)
        if stack is not None:
            instance.stack_tags.set(_resolve_tags(stack))
        if proj is not None:
            instance.project_tags.set(_resolve_tags(proj))
        return instance


class ProjectImageSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = ProjectImage
        fields = ('id', 'image', 'project', 'caption')


class AboutFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutFact
        fields = ('__all__')
