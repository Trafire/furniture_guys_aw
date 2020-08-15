from rest_framework import serializers
from .models import Employers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class EmployersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employers
        user = UserSerializer()
        fields = ('id', 'name', 'email', 'user', 'company')


