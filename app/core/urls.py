from django.urls import path

from .views import UploadImage

urlpatterns = [
    path('images/', UploadImage.as_view()),
]
