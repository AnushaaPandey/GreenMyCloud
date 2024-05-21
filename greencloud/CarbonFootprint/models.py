
from django.utils import timezone 
from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser, PermissionsMixin
from .factors1 import calculate_emissions

class UserManager(BaseUserManager):
  def create_user(self, email, name, lastname,  username,  password=None, password2=None):
      """
      Creates and saves a User with the given email, name, and password.
      """
      if not email:
          raise ValueError('User must have an email address')

      user = self.model(
          email=self.normalize_email(email),
          name=name,
          username=username, 
          lastname = lastname,
      )

      user.set_password(password)
      user.save(using=self._db)
      return user

  def create_superuser(self, email, username, name,lastname,  password=None):
      """
      Creates and saves a superuser with the given email, name, tc and password.
      """
      user = self.create_user(
          email,
          username = username,
          password=password,
          name=name,
          lastname= lastname,
    
      )
      user.is_admin = True
      user.save(using=self._db)
      return user

#  Custom User Model
class User(AbstractBaseUser):
  email = models.EmailField(
      verbose_name='Email',
      max_length=255,
      unique=True,
  )
  username = models.CharField(max_length=128, unique=True, default='default_username')
  name = models.CharField(max_length=200, default='')
  lastname = models.CharField(max_length=200,  default='')
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)
  created_at = models.DateTimeField(default=timezone.now)
  updated_at = models.DateTimeField (default=timezone.now)

  objects = UserManager()

  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = ['name','lastname', 'email']

  def __str__(self):
      return self.username

  def has_perm(self, perm, obj=None):
      "Does the user have a specific permission?"
      # Simplest possible answer: Yes, always
      return self.is_admin

  def has_module_perms(self, app_label):
      "Does the user have permissions to view the app `app_label`?"
      # Simplest possible answer: Yes, always
      return True

  @property
  def is_staff(self):
      "Is the user a member of staff?"
      # Simplest possible answer: All admins are staff
      return self.is_admin


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


class AdminDatabase(models.Model):
    api_data = models.JSONField()
    articles = models.TextField()

    def __str__(self):
        return self.api_data

