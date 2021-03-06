# Generated by Django 3.1 on 2020-08-15 23:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_auto_20200815_1912'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobTypes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Postings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('employer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jobs.employers')),
                ('job_types', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jobs.jobtypes')),
            ],
        ),
    ]
