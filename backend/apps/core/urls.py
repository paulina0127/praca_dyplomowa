"""Urls for Core app."""

# Django
from django.urls import path

# Local
from .views import serve_image

urlpatterns = [
    path("media/<path:path>", serve_image, name="serve_image"),
]
