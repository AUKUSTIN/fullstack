# Generated by Django 5.1 on 2024-10-08 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0010_remove_product_category_createquiz_created_at_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='createquiz',
            name='id',
        ),
        migrations.AddField(
            model_name='createquiz',
            name='question_ID',
            field=models.AutoField(default=1000, primary_key=True, serialize=False),
        ),
    ]
