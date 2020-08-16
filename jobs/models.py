from django.db import models
from django.contrib.auth.models import User
from django.core.validators import EmailValidator


class Employers(models.Model):
    '''
    Stores a single Employer related to :model:`auth.User`
    '''
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.CharField(max_length=255, null=True)


class JobTypes(models.Model):
    category = models.CharField(null=False, max_length=255)
    def __str__(self):
        return self.category


class Postings(models.Model):
    employer = models.ForeignKey(Employers, on_delete=models.CASCADE)
    active = models.BooleanField(default=False, null=False)
    title = models.CharField(null=False, max_length=255)
    description = models.TextField(null=False)
    job_types = models.ForeignKey(JobTypes, on_delete=models.CASCADE)
