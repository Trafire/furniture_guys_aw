from django.shortcuts import render
from django.http import HttpResponse
from .models import Employers, JobTypes, Postings, Candidates, Applications
from .serializers import EmployersSerializer, UserSerializer, JobTypesSerializer, PostingsSerializer, \
    CandidatesSerializer, ApplicationsSerializer
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


class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidates.objects.all()
    serializer_class = CandidatesSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Applications.objects.all()
    serializer_class = ApplicationsSerializer
