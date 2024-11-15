# Generated by Django 5.1 on 2024-10-14 04:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0023_createtest_question'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='correct_answer',
            field=models.JSONField(),
        ),
        migrations.AlterField(
            model_name='question',
            name='options',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
