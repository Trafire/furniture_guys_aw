from rest_framework import serializers
from .models import Employers, JobTypes, Postings, Candidates, Applications
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class EmployersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employers
        user = UserSerializer()
        fields = ('id', 'user', 'company')


class JobTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobTypes
        fields = ('category')


class PostingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postings
        job_types = JobTypesSerializer()
        fields = ('id', 'employer', 'active', 'title', 'description', 'job_types')


class CandidatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('id', 'name', 'email', 'resume')



class ApplicationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        candidate =  CandidatesSerializer()
        posting = PostingsSerializer()
        fields = ('id', 'candidate', 'posting', 'application_time')

