from rest_framework import status,viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import base64
from io import BytesIO
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes
from django.shortcuts import get_object_or_404
from .models import CreateQuiz
from .models import Question,CreateTest
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response  # Assuming you have a Question model
from .serializers import QuestionSerializer  # Assuming you have a serializer for Question


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    try:
        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()
        return Response({'message': 'User created'}, status=status.HTTP_201_CREATED)
    except IntegrityError:
        return Response({'error': 'Username or email already exists'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        auth_login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def dashboard(request):
    if request.user.is_authenticated:
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            profile_image_url = user_profile.profile_image.url if user_profile.profile_image else None
        except UserProfile.DoesNotExist:
            profile_image_url = None
        print(profile_image_url)
        return Response({
            'email': f'{request.user.email}',
            'message': f'{request.user.username}',
            'profileImage': profile_image_url
        }, status=status.HTTP_200_OK)
    return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def upload_profile_image(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
    
    user_profile, created = UserProfile.objects.get_or_create(user=user)
    
    if 'profile_image' in request.FILES:
        user_profile.profile_image = request.FILES['profile_image']
        user_profile.save()
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, pk=None):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({'detail': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='upload-profile-image')
    def upload_profile_image(self, request):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({'detail': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        if 'profile_image' in request.FILES:
            profile_image = request.FILES['profile_image']
            profile.profile_image = profile_image
            profile.save()
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)

        if 'profile_image' in request.data:
            data_url = request.data['profile_image']
            format, imgstr = data_url.split(';base64,')
            ext = format.split('/')[-1]
            image = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)

            profile.profile_image.save('profile_image.' + ext, image, save=True)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'detail': 'No image provided.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def submit_questions(request):
    try:
        print(request.data)
        questions_data = request.data['questions']
        test_title = request.data['testTitle']
        test_introduction = request.data['testIntroduction']

        # Create a quiz entry first
        
        CreateQuiz.objects.filter(creator_ID=request.user).delete()

            
        # Loop through the questions and save the details based on their type
        for question_data in questions_data:
            quiz = CreateQuiz.objects.create(
            creator_ID=request.user,
            test_title=test_title,
            Introduction=test_introduction,
            )
            # Determine the question type
            question_type = question_data.get('type', 'multiplechoice')
            quiz.question= question_data['text'] 
            quiz.question_type= question_data['type']
            # If it's a fill-in-the-blank or true/false, just save the correct answer
            if question_type == 'fillintheblank' or question_type == 'truefalse':
                # Save the correct answer directly (assuming it's a string)
                quiz.is_correct.append(question_data['correctAnswer'])  # Save correct answer directly

            # If it's a multiple-choice question, save options
            elif question_type == 'multiplechoice' or question_type == 'multipleresponse':
                options = question_data.get('options', [])
                quiz.options.append(options)  # Save options directly
                if question_type == 'multipleresponse':
                    correct_answers = question_data.get('correctAnswers', [])  # List of correct answers
                    for answer in correct_answers:
                        quiz.is_correct.append(options[answer])
                else:
                    # For regular multiple choice (single correct answer)
                    quiz.is_correct.append(options[question_data['correctAnswer']])
                            

        # Save the quiz object after appending options and answers
            print(quiz)
            quiz.save()

        return Response({"message": "Questions submitted successfully"}, status=201)

    except Exception as e:
        print(f"Error submitting questions: {e}")
        return Response({"error": str(e)}, status=400)



@api_view(['POST'])
def submit_questions2(request):
    try:
        # Retrieve data from the request
        test_title = request.data.get('testTitle')
        test_introduction = request.data.get('testIntroduction')
        questions_data = request.data.get('questions', [])

        def validate_questions(questions_data):
          
            is_valid = True
            for question_data in questions_data:
                print(question_data)
                question_text = question_data.get('text')
                question_type = question_data.get('type')
                options = question_data.get('options', [])
                correct_answer = question_data.get('correctAnswer')
                # Check that question_text exists
                if not question_text:
                    is_valid = False
                    print(2)
                    break
                
                # Validate based on question type
                if question_type in ['multiplechoice']:
                    print(correct_answer)
                    # Multiple choice questions must have options and a correct answer in options
                    if not options or len(options) < 2 or correct_answer is None:
                        is_valid = False
                        break
                elif question_type in ['fillintheblank', 'truefalse']:
                    # Fill-in-the-blank and True/False questions should not have options
                    
                    if correct_answer is None:
                        print(4)
                        is_valid = False
                        break

            return is_valid
        
            
        if validate_questions(questions_data):
            quiz = CreateTest.objects.create(
                creator=request.user,
                test_title=test_title,
                introduction=test_introduction,
            )
        else:
            raise ValidationError("Some questions are missing required fields or have invalid configurations.")


        # Loop through each question in the submitted data
        for question_data in questions_data:
            question_text = question_data.get('text')
            question_type = question_data.get('type')
            options = question_data.get('options', [])
            correct_answer = question_data.get('correctAnswer')
            # Validate question data
            if not question_text or not question_type:
                return Response({"error": "Each question must have text and type."}, status=400)
            # Create the question instance
            question = Question.objects.create(
                quiz=quiz,
                question=question_text,
                question_type=question_type,
                correct_answer=correct_answer if question_type in ['fillintheblank', 'truefalse'] else 'null',
            )
            
            # If it's a multiple-choice question, save options
  
            if question_type in ['multiplechoice', 'multipleresponse']:
                # Update the question instance with options
                question.options = options  # Assign the options directly to the question
                question.save()  # Save the question instance

                if question_type == 'multipleresponse':
                    correct_answers = question_data.get('correctAnswers', [])  # List of correct answers
                    question.correct_answer = [options[answer] for answer in correct_answers]
                else:
                    # For regular multiple choice (single correct answer)
                    question.correct_answer = options[question_data['correctAnswer']]

            # Ensure to save the question after setting options and correct answer
            question.save()

        return Response({
            "message": "Quiz and questions submitted successfully",
            "test_id": quiz.Test_ID  # Ensure this line is returning the test ID
        }, status=201)

    except Exception as e:
        print(f"Error submitting quiz: {e}")
        return Response({"error": str(e)}, status=400)



@api_view(['POST'])
@permission_classes([AllowAny])  # Allow access to everyone
def get_question(request, testID):
    try:
        # Fetch questions related to the given testID
        print(testID)
        questions = Question.objects.filter(quiz__Test_ID=testID)  # Adjusted to use the correct relationship
        serializer = QuestionSerializer(questions, many=True)  # Serialize the data
        print(serializer.data)
        return Response(serializer.data)
    except Question.DoesNotExist:
        return Response({'error': 'No questions found for this test.'}, status=404)


# @api_view(['POST'])
# @permission_classes([AllowAny])  # Allow access to everyone
# def submit-answer(request, testID):
#     try:

