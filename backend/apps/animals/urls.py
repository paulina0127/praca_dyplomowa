"""Urls for Animals app."""

# Django
from django.urls import path

# Local
from .views import AnimalDetail
from .views import AnimalList
from .views import BreedList, BreedDetail

urlpatterns = [
    path("breeds", BreedList.as_view(), name=BreedList.name),
    path("breeds/<int:pk>", BreedDetail.as_view(), name=BreedDetail.name),
    path("animals", AnimalList.as_view(), name=AnimalList.name),
    path("animals/<int:pk>", AnimalDetail.as_view(), name=AnimalDetail.name),
]
