# Generated by Django 5.1 on 2024-10-10 04:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0019_createtest_question_option_correctanswer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='createtest',
            name='creator',
        ),
        migrations.RemoveField(
            model_name='question',
            name='quiz',
        ),
        migrations.RemoveField(
            model_name='option',
            name='question',
        ),
        migrations.DeleteModel(
            name='CorrectAnswer',
        ),
        migrations.DeleteModel(
            name='CreateTest',
        ),
        migrations.DeleteModel(
            name='Option',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
    ]