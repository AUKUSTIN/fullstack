from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='profile_images/')
    # Add any additional fields you need here

    def __str__(self):
        return self.user.username
        
class CreateQuiz(models.Model):
    question_ID = models.AutoField(primary_key=True) 
    creator_ID = models.ForeignKey(User, on_delete=models.CASCADE)
    test_title = models.CharField(max_length=255)
    Introduction = models.CharField(max_length=255)
    question = models.TextField()
    question_type = models.CharField(max_length=255)
    options = models.JSONField(default=list)
    is_correct = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True,null=True, blank=True)



class CreateTest(models.Model):
    Test_ID = models.AutoField(primary_key=True) 
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="quizzes")
    test_title = models.CharField(max_length=255)
    introduction = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Question(models.Model):
    question_ID = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(CreateTest, on_delete=models.CASCADE, related_name="questions")
    
    question = models.TextField()
    question_type = models.CharField(max_length=255)
    options = models.TextField()
    correct_answer = models.TextField(blank = True,null= True)   


class TestParticipant(models.Model):
    test = models.ForeignKey(CreateTest, on_delete=models.CASCADE, related_name="participants")
    participant_name = models.CharField(max_length=255)  # Allow users to enter their name when taking the test
    joined_at = models.DateTimeField(auto_now_add=True)  # When they started the test

    def __str__(self):
        return f'{self.participant_name} - {self.test.test_title}'

class UserResponse(models.Model):
    participant = models.ForeignKey(TestParticipant, on_delete=models.CASCADE, related_name="responses")
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="user_responses")
    answer_given = models.TextField()  # Store the answer provided by the participant
    is_correct = models.BooleanField(default=False)  # Whether the answer is correct or not

    def __str__(self):
        return f'{self.participant.participant_name} - {self.question.question} - {self.answer_given}'
    