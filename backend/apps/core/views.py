"""Views for Core app."""

# Standard Library
import os

# Django
from django.conf import settings
from django.http import Http404
from django.http import HttpResponse


def serve_image(request, path):
    # Construct the absolute path to the file
    abs_path = os.path.join(settings.MEDIA_ROOT, path)

    # Check if the file exists
    if not os.path.exists(abs_path):
        raise Http404("File not found")

    # Get the file extension
    file_extension = os.path.splitext(abs_path)[1].lower()

    # Set the appropriate content type based on the file extension
    if file_extension in [".jpg", ".jpeg"]:
        content_type = "image/jpeg"
    elif file_extension == ".png":
        content_type = "image/png"
    else:
        content_type = "application/octet-stream"

    # Open the file as binary data
    with open(abs_path, "rb") as f:
        file_data = f.read()

    # Return the file data as a response
    response = HttpResponse(file_data, content_type=content_type)
    response["Content-Disposition"] = "inline; filename=" + os.path.basename(abs_path)
    return response
