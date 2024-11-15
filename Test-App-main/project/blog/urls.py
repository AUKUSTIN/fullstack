from django.urls import path,include
from .views import register, login, dashboard, upload_profile_image
from .views import UserProfileViewSet
from rest_framework.routers import DefaultRouter
from .views import submit_questions,submit_questions2,get_question


router = DefaultRouter()
router.register(r'profile', UserProfileViewSet, basename='profile')

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('dashboard/', dashboard, name='dashboard'),
    path('upload-profile-image/', upload_profile_image, name='upload_profile_image'),
    path('submit-questions/', submit_questions, name='submit-test'),
    path('submit-questions2/', submit_questions2, name='submit-test'),
    path('get-question/<int:testID>/', get_question, name='get-question'),
    # path('submit-answer/', submit-answer, name='submit-answer'),
]
