"""Urls for Core app."""

from django.urls import path

from .views import serve_image

urlpatterns = [
    path("media/<path:path>", serve_image, name="serve_image"),
]
