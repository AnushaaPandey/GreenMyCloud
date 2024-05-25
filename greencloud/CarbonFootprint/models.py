
from django.utils import timezone 
from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator, MinLengthValidator
from django.core.exceptions import ValidationError

class UserManager(BaseUserManager):
  def create_user(self, email, name, lastname,  username,  password=None, password2=None):
      """
      Creates and saves a User with the given email, name, and password.
      """
      if not email:
          raise ValueError('User must have an email address')

      user = self.model(
          email=self.normalize_email(email),
          name=name.capitalize(),
          username=username, 
          lastname = lastname.capitalize(),
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
  last_login = models.DateTimeField (default=timezone.now)


  objects = UserManager()

  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = ['name','lastname', 'email']

  def __str__(self):
      return self.username

  def clean(self):
        self.name = self.name.capitalize()
        self.lastname = self.lastname.capitalize()
        self.validate_password(self.password)

  def validate_password(self, password):
        validators = [
            MinLengthValidator(8),
            RegexValidator(
                regex=r'^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).+$',
                message='Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
            )
        ]
        for validator in validators:
            validator(password)

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
    transportation_emissions = models.FloatField()
    waste_emissions = models.FloatField()
    electricity_emissions = models.FloatField()
    screentime_emissions = models.FloatField()
    dietary_emissions = models.FloatField()
    total_emissions = models.FloatField()
    average_emissions = models.FloatField()
    
class EmissionData(models.Model):
    transportation_mode = models.CharField(max_length=50)
    transportation_distance = models.FloatField()
    waste_weight_kg = models.FloatField()
    electricity_kWh = models.FloatField()
    screentime_hours = models.FloatField()
    dietary_meals = models.FloatField()
    transportation_emissions = models.FloatField()
    waste_emissions = models.FloatField()
    electricity_emissions = models.FloatField()
    screentime_emissions = models.FloatField()
    dietary_emissions = models.FloatField()
    total_emissions = models.FloatField()
    average_emissions = models.FloatField()


class AdminDatabase(models.Model):
    api_data = models.JSONField()
    articles = models.TextField()

    def __str__(self):
        return self.api_data


