"""Urls for Animals app."""

# Django
from django.urls import path

# Local
from .views import AnimalDetail
from .views import AnimalList

urlpatterns = [
    path("animals", AnimalList.as_view(), name=AnimalList.name),
    path("animals/<int:pk>", AnimalDetail.as_view(), name=AnimalDetail.name),
]
