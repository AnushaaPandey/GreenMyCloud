from django.contrib import admin
from .models import User 
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
  list_display = ('id', 'email', 'name','lastname',  'username', 'is_admin')
  list_filter = ('is_admin',)
  fieldsets = (
      ('User Credentials', {'fields': ('username', 'password')}),
      ('Personal info', {'fields': ('name',  'lastname')}),
      ('Permissions', {'fields': ('is_admin',)}),
  )
  # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
  # overrides get_fieldsets to use this attribute when creating a user.
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'name', 'lastname', 'username',  'password1', 'password2'),
      }),
  )
  search_fields = ('username',)
  ordering = ('username', 'id')
  filter_horizontal = ()
  
#   admin.site.register(BaseUserAdmin, User)
