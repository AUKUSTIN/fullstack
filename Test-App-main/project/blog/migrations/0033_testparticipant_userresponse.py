# Generated by Django 5.1 on 2024-10-23 04:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0032_remove_createtest_id_createtest_test_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestParticipant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('participant_name', models.CharField(max_length=255)),
                ('joined_at', models.DateTimeField(auto_now_add=True)),
                ('test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participants', to='blog.createtest')),
            ],
        ),
        migrations.CreateModel(
            name='UserResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer_given', models.TextField()),
                ('is_correct', models.BooleanField(default=False)),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='blog.testparticipant')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_responses', to='blog.question')),
            ],
        ),
    ]
