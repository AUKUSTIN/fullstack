# Generated by Django 5.1 on 2024-10-14 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0031_createtest_question'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='createtest',
            name='id',
        ),
        migrations.AddField(
            model_name='createtest',
            name='Test_ID',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='question',
            name='correct_answer',
            field=models.TextField(blank=True, null=True),
        ),
    ]
