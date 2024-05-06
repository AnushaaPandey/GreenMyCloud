from django.db import models
from .factors1 import calculate_emissions

# Create your models here.

class Register(models.Model):
    username = models.CharField(max_length=128)
    name = models.CharField(max_length=128)
    surname = models.CharField(max_length=128)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    re_password = models.CharField(max_length=128)

    def __str__(self):
        return self.username
    


class User(models.Model):
    username = models.CharField(max_length=128)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username

class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transportation_emissions = models.FloatField(max_length=128)
    mode_of_transportation = models.CharField(max_length=128)
    waste_emissions = models.FloatField(max_length=128)
    diet_emissions = models.FloatField(max_length=128)
    electricity = models.FloatField()
    screentime_emissions = models.FloatField()

class Result(models.Model):
    res_transportation = models.FloatField()
    res_waste = models.FloatField()
    res_dietary_plan = models.FloatField()
    res_electricity = models.FloatField()
    res_screentime = models.FloatField()
    total = models.FloatField()

class EmissionData(models.Model):
    transportation_emissions = models.FloatField(100)
    electricity_emissions = models.FloatField(100)
    diet_emissions = models.FloatField(100)
    waste_emissions = models.FloatField(100)
    screentime_emission = models.FloatField(100)
    total_emissions = models.FloatField(100)


class AdminDatabase(models.Model):
    api_data = models.JSONField()
    articles = models.TextField()

    def __str__(self):
        return self.api_data

