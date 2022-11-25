# Generated by Django 4.0.4 on 2022-05-16 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('whoismari', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('content', models.TextField()),
                ('stack', models.TextField()),
                ('image', models.FileField(upload_to='projects/')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-timestamp'],
            },
        ),
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='postimage',
            name='image',
            field=models.FileField(upload_to='post_<django.db.models.fields.related.ForeignKey>/'),
        ),
    ]
