# Generated by Django 3.2.8 on 2022-09-29 10:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('whoismari', '0015_alter_projectimage_caption'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Comment',
        ),
    ]