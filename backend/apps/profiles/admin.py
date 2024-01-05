"""Admin file for Profiles app."""

# Django
from django.contrib import admin
from django.core.mail import send_mail

# Local
from .models import Shelter


@admin.register(Shelter)
class ShelterAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "nip"]
    search_fields = ["name", "nip", "city"]

    def save_model(self, request, obj, form, change):
        if not obj.is_verified and form.cleaned_data["is_verified"]:
            subject = "Adoptable - Twój profil został zweryfikowany"
            message = f"Twój profil na naszej platformie został zweryfikowany. Teraz twoje zwierzęta dodane do adopcji zostaną opublikowane na stronie.\n\nZespół Adoptable"
            recipient_list = [obj.user.email]

            send_mail(subject, message, "kontakt@adoptable.pl", recipient_list)

        super().save_model(request, obj, form, change)
