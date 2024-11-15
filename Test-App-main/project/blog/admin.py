from django.contrib import admin
from .models import *

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_image')


@admin.register(CreateQuiz)
class CreateQuizAdmin(admin.ModelAdmin):
    list_display = ('question_ID','creator_ID','test_title','Introduction','question','question_type','options','is_correct','created_at')


@admin.register(CreateTest)
class CreateTestAdmin(admin.ModelAdmin):
    list_display = ('Test_ID','creator','test_title','introduction','created_at')

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_ID','quiz','question','question_type','correct_answer','options')

@admin.register(TestParticipant)
class TestParticipantAdmin(admin.ModelAdmin):
    list_display = ('participant_name', 'test', 'joined_at')
    search_fields = ('participant_name', 'test__test_title')
    list_filter = ('joined_at',)

@admin.register(UserResponse)
class UserResponseAdmin(admin.ModelAdmin):
    list_display = ('participant', 'question', 'answer_given', 'is_correct')
    search_fields = ('participant__participant_name', 'question__question')
    list_filter = ('is_correct',)