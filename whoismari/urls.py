from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # public
    path('projects/', views.ProjectView.as_view()),
    path('certificates/', views.CertificateView.as_view()),
    path('images/<str:project_id>/', views.ProjectImagesView.as_view()),
    path('blog/', views.BlogView.as_view()),
    path('about/', views.AboutView.as_view()),
    path('about-facts/', views.AboutFactView.as_view()),
    path('my-skills/', views.MySkillsView.as_view()),
    path('blog/<str:slug>/', views.PostView.as_view()),

    # auth
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),

    # admin
    path('admin/tags/', views.AdminTagListView.as_view()),
    path('admin/posts/', views.AdminPostListView.as_view()),
    path('admin/posts/<int:pk>/', views.AdminPostDetailView.as_view()),
    path('admin/projects/', views.AdminProjectListView.as_view()),
    path('admin/projects/<int:pk>/', views.AdminProjectDetailView.as_view()),
    path('admin/certificates/', views.AdminCertificateListView.as_view()),
    path('admin/certificates/<int:pk>/', views.AdminCertificateDetailView.as_view()),
    path('admin/projects/<int:project_id>/images/', views.AdminProjectImageListView.as_view()),
    path('admin/project-images/<int:pk>/', views.AdminProjectImageDetailView.as_view()),
    path('admin/about-facts/', views.AdminAboutFactListView.as_view()),
    path('admin/about-facts/<int:pk>/', views.AdminAboutFactDetailView.as_view()),
]
