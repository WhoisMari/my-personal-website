from django.urls import path
from . import views

urlpatterns = [
	path('projects/', views.ProjectView.as_view()),
	path('certificates/', views.CertificateView.as_view()),
	path('images/<str:project_id>/', views.ProjectImagesView.as_view()),
	path('blog/', views.BlogView.as_view()),
	path('about/', views.AboutView.as_view()),
	path('my-skills/', views.MySkillsView.as_view()),
	path('blog/<str:slug>/', views.PostView.as_view()),
]