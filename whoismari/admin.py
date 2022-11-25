from django.contrib import admin
from .models import Post, Project, Tag, ProjectImage, Certificate
# Register your models here.

admin.site.register(Post)
admin.site.register(Certificate)
admin.site.register(Tag)
admin.site.register(Project)
admin.site.register(ProjectImage)