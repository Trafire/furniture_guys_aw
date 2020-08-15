from django.db import models
from django.contrib.auth.models import User
from django.core.validators import EmailValidator


class Employers(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.CharField(max_length=255, null=True)
