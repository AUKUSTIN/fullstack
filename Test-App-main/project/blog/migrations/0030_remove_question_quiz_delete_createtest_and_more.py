# Generated by Django 5.1 on 2024-10-14 10:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0029_createtest_question'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='quiz',
        ),
        migrations.DeleteModel(
            name='CreateTest',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
    ]