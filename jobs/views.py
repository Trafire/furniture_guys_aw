from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Employers, JobTypes, Postings, Candidates, Applications
from .serializers import EmployersSerializer, UserSerializer, JobTypesSerializer, PostingsSerializer, \
    CandidatesSerializer, ApplicationsSerializer
from rest_framework import viewsets, filters
from django.contrib.auth.models import User
from url_filter.integrations.drf import DjangoFilterBackend
import json


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
    filter_backends = [ DjangoFilterBackend]
    filter_fields = ['id', 'active']
    queryset = Postings.objects.all().order_by('-id')



class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidates.objects.all()
    serializer_class = CandidatesSerializer

    def create(self, request, *args, **kwargs):
        json_data = json.loads(request.body)
        print(json_data)
        try:
            candidate = Candidates.objects.create(**json_data)
        except:
            candidate = Candidates.objects.get(email=json_data['email'])
            candidate.name = json_data['name']

        candidate.save()
        json_data['id'] = candidate.id
        return JsonResponse(json_data)


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Applications.objects.all()
    serializer_class = ApplicationsSerializer

    def create(self, request, *args, **kwargs):
        json_data = json.loads(request.body)
        print(json_data)
        candidate = Candidates.objects.get(id=int(json_data['candidate']))
        posting = Postings.objects.get(id=int(json_data['posting']))
        application = Applications.objects.get_or_create(candidate=candidate, posting=posting)[0]
        application.save()
        data = Applications.objects.filter(candidate=candidate).values_list('posting', flat=True)
        return JsonResponse({'applications': list(data)})
