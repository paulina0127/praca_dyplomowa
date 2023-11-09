# Standard Library
import os
from pathlib import Path

# Third-party
# 3rd-Party
import environ


class EnvController:
    """Controller for setting and getting environmental variables."""

    BASE_DIR = Path(__file__).resolve().parent.parent
    env = environ.Env(DEBUG=(bool, False))
    environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

    @staticmethod
    def get():
        """Getting the env object."""
        return EnvController.env
