# Generated by Django 5.1 on 2024-10-10 04:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0022_remove_question_quiz_delete_createtest_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CreateTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test_title', models.CharField(max_length=255)),
                ('introduction', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('question_ID', models.AutoField(primary_key=True, serialize=False)),
                ('question', models.TextField()),
                ('question_type', models.CharField(max_length=255)),
                ('options', models.TextField()),
                ('correct_answer', models.TextField()),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='blog.createtest')),
            ],
        ),
    ]
