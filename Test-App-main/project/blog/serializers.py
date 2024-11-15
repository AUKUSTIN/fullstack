from rest_framework import serializers, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile
from .models import Question 

class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = UserProfile
        fields = ['profile_image']

class UserProfileViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        user = self.request.user
        profile = UserProfile.objects.get(user=user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question_ID', 'quiz', 'question', 'question_type', 'options', 'correct_answer']
