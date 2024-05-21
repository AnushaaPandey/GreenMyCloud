
# Generated by Django 5.0.4 on 2024-05-19 11:20

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(

            name='AdminDatabase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('api_data', models.JSONField()),
                ('articles', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='EmissionData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transportation_emissions', models.FloatField(verbose_name=100)),
                ('electricity_emissions', models.FloatField(verbose_name=100)),
                ('diet_emissions', models.FloatField(verbose_name=100)),
                ('waste_emissions', models.FloatField(verbose_name=100)),
                ('screentime_emission', models.FloatField(verbose_name=100)),
                ('total_emissions', models.FloatField(verbose_name=100)),
            ],
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('res_transportation', models.FloatField()),
                ('res_waste', models.FloatField()),
                ('res_dietary_plan', models.FloatField()),
                ('res_electricity', models.FloatField()),
                ('res_screentime', models.FloatField()),
                ('total', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='Email')),
                ('username', models.CharField(default='default_username', max_length=128, unique=True)),
                ('name', models.CharField(default='', max_length=200)),
                ('lastname', models.CharField(default='', max_length=200)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transportation_emissions', models.FloatField(max_length=128)),
                ('mode_of_transportation', models.CharField(max_length=128)),
                ('waste_emissions', models.FloatField(max_length=128)),
                ('diet_emissions', models.FloatField(max_length=128)),
                ('electricity', models.FloatField()),
                ('screentime_emissions', models.FloatField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ],

