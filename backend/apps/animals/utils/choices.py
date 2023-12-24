"""Model text choices for Animals app."""

# Django
from django.db import models


class AnimalStatus(models.TextChoices):
    ADOPTED = "Adoptowany", "Adoptowany"
    TO_BE_ADOPTED = "Do adopcji", "Do adopcji"
    DECEASED = "Zmarły", "Zmarły"


class AnimalSex(models.TextChoices):
    MALE = "Samiec", "Samiec"
    FEMALE = "Samica", "Samica"


class AnimalSize(models.TextChoices):
    SMALL = "Mały", "Mały"
    MEDIUM = "Średni", "Średni"
    LARGE = "Duży", "Duży"
    EXTRA_LARGE = "Bardzo duży", "Bardzo duży"


class AnimalSpecies(models.TextChoices):
    DOG = "Pies", "Pies"
    CAT = "Kot", "Kot"
    RABBIT = "Królik", "Królik"
    RODENT = "Gryzoń", "Gryzoń"
    BIRD = "Ptak", "Ptak"
    REPTILE = "Gad", "Gad"


class AnimalAge(models.TextChoices):
    VERY_YOUNG = "Bardzo młody", "Bardzo młody"
    YOUNG = "Młody", "Młody"
    ADULT = "Dorosły", "Dorosły"
    SENIOR = "Senior", "Senior"


class AnimalTemperament(models.TextChoices):
    FRIENDLY = "Przyjacielski", "Przyjacielski"
    LOYAL = "Lojalny", "Lojalny"
    PLAYFUL = "Swawolny", "Swawolny"
    CALM = "Spokojny", "Spokojny"
    ENERGETIC = "Energiczny", "Energiczny"
    SHY = "Nieśmiały", "Nieśmiały"
    AGGRESSIVE = "Agresywny", "Agresywny"
    INDEPENDENT = "Niezależny", "Niezależny"
    CURIOUS = "Ciekawy", "Ciekawy"
    NERVOUS = "Nerwowy", "Nerwowy"
    AFFECTIONATE = "Czuły", "Czuły"
    PROTECTIVE = "Obronny", "Obronny"
    TERRITORIAL = "Terytorialny", "Terytorialny"
    ADVENTUROUS = "Żądny przygód", "Żądny przygód"
    CAUTIOUS = "Ostrożny", "Ostrożny"


class AnimalEnergyLevel(models.TextChoices):
    LOW = "Kanapowiec", "Kanapowiec"
    AVERAGE = "Aktywny", "Aktywny"
    HIGH = "Bardzo aktywny", "Bardzo aktywny"


class AnimalActivities(models.TextChoices):
    PLAYING = "Zabawa", "Zabawa"
    WALKS = "Spacery", "Spacery"
    TRAINING = "Szkolenie", "Szkolenie"
    PETTING = "Pieszczoty", "Pieszczoty"
