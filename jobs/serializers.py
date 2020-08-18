from rest_framework import serializers
from .models import Employers, JobTypes, Postings, Candidates, Applications
from django.contrib.auth.models import User


from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')




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
        depth = 1
        fields = ('id', 'employer', 'active', 'title', 'description', 'job_types', 'posting_time')


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

