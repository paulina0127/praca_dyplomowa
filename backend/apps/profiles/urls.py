"""Urls for Profiles app."""

# Django
from django.urls import path

# Local
from .views import ShelterDetail
from .views import ShelterList

urlpatterns = [
    path("shelters", ShelterList.as_view(), name=ShelterList.name),
    path("shelters/<int:pk>", ShelterDetail.as_view(), name=ShelterDetail.name),
]
