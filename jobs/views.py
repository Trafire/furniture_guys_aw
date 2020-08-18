from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
from .models import Employers, JobTypes, Postings, Candidates, Applications
from .serializers import EmployersSerializer, UserSerializer, JobTypesSerializer, PostingsSerializer, \
    CandidatesSerializer, ApplicationsSerializer
from rest_framework import viewsets, filters, status, permissions
from django.contrib.auth.models import User
from url_filter.integrations.drf import DjangoFilterBackend
import json
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt


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
    queryset = Postings.objects.all().order_by('-id')
    serializer_class = PostingsSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id', 'active', 'employer']

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serialize(instance, data=request.body, partial=True)
        serializer.save()
        return JsonResponse(serializer.data)


class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidates.objects.all()
    serializer_class = CandidatesSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Applications.objects.all()
    serializer_class = ApplicationsSerializer




@csrf_exempt
def login_user(request):
    json_data = json.loads(request.body)
    if 'username' not in json_data and 'password' not in json_data:
        raise PermissionDenied()
    username = json_data['username']
    password = json_data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data, status=201)
    else:
        raise PermissionDenied()


@csrf_exempt
def create_posting(request):
    json_data = json.loads(request.body)
    user = User.objects.get(username=json_data['employer'])
    job_types = JobTypes.objects.get(category=json_data['job_types'])
    try:
        employer = Employers.objects.get(user=user)
    except:
        Employers.objects.create(user=user, company=user.username).save()
        employer = Employers.objects.get(user=user)
    json_data['employer'] = employer
    json_data['job_types'] = job_types
    posting = Postings.objects.create(**json_data)
    posting.save()
    serializer = PostingsSerializer(posting)
    return JsonResponse(serializer.data, status=201)


@csrf_exempt
def activatePosting(request, id):
    posting = Postings.objects.get(id=id)
    total_active_postings = Postings.objects.filter(active=True, employer__company=posting.employer.company)
    print(len(total_active_postings))
    if len(total_active_postings) >= 10:
        return JsonResponse({'update': False}, status=201)
    posting.active = True
    posting.save()
    return JsonResponse({'update': True}, status=201)


@csrf_exempt
def deactivatePosting(request, id):
    posting = Postings.objects.get(id=id)
    posting.active = False
    posting.save()
    serializer = PostingsSerializer(posting)
    return JsonResponse(serializer.data, status=201)


def stats(request):
    applications = Applications.objects.all()
    postings = Postings.objects.all()
    applied_count = {}
    offered_count = {}
    for item in applications:
        cat = item.posting.job_types.category
        if cat in applied_count:
            applied_count[cat] += 1
        else:
            applied_count[cat] = 1
        if cat not in offered_count:
            offered_count[cat] = 0

    for item in postings:
        cat = item.job_types.category
        if cat in offered_count:
            offered_count[cat] += 1
        else:
            offered_count[cat] = 1

        if cat not in applied_count:
            applied_count[cat] = 0

    return JsonResponse({'applied_count': applied_count, 'offered_count': offered_count})


@csrf_exempt
def create_auth(request):
    serialized = json.loads(request.body)

    user = User.objects.create_user(
        serialized['username'],
        serialized['email'],
        serialized['password']
    )
    Employers.objects.create(user=user, company=serialized['username'])
    return JsonResponse(serialized, status=status.HTTP_201_CREATED)


@csrf_exempt
def create_candidate(request):
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


def create_application(request, c,p):

    candidate = Candidates.objects.get(id=int(c))
    posting = Postings.objects.get(id=int(p))
    application = Applications.objects.get_or_create(candidate=candidate, posting=posting)[0]
    application.save()
    data = Applications.objects.filter(candidate=candidate).values_list('posting', flat=True)
    return JsonResponse({'applications': list(data)})