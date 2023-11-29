"""Model text choices for Applications app."""

# Django
from django.db import models


class ApplicationStatus(models.TextChoices):
    SUBMTTED = "Złożona", "Złożona"
    ACCEPTED = "Zaakceptowana", "Zaakceptowana"
    REJECTED = "Odrzucona", "Odrzucona"
