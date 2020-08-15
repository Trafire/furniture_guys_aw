from django.shortcuts import render
from django.http import HttpResponse
from .models import Employers
from .serializers import EmployersSerializer, UserSerializer
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


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
