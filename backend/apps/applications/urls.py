"""Urls for Applications app."""

# Django
from django.urls import path

# Local
from .views import ApplicationDetail
from .views import ApplicationList

urlpatterns = [
    path("applications", ApplicationList.as_view(), name=ApplicationList.name),
    path(
        "applications/<int:pk>",
        ApplicationDetail.as_view(),
        name=ApplicationDetail.name,
    ),
]
