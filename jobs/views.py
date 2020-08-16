from django.shortcuts import render
from django.http import HttpResponse
from .models import Employers, JobTypes, Postings
from .serializers import EmployersSerializer, UserSerializer, JobTypesSerializer, PostingsSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User


class EmployersViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Employers.objects.all()
    serializer_class = EmployersSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class JobTypeViewSet(viewsets.ModelViewSet):
    queryset = JobTypes.objects.all()
    serializer_class = JobTypesSerializer

class PostingViewSet(viewsets.ModelViewSet):
    queryset = Postings.objects.all()
    serializer_class = PostingsSerializer


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
