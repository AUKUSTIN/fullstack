# Generated by Django 5.1 on 2024-10-08 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0011_remove_createquiz_id_createquiz_question_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='createquiz',
            name='question_ID',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
