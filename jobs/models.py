from django.db import models
from django.core.validators import EmailValidator


class Employers(models.Model):
    user = models.ForeignKey('auth.User', related_name='employer', on_delete=models.CASCADE)
    email = models.EmailField(validators=[EmailValidator])
    name = models.CharField(max_length=255, null=False)
    company = models.CharField(max_length=255, null=True)
