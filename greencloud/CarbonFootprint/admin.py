
from django.contrib import admin
from .models import User , EmissionData,Result
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

# @admin.register(EmissionData)
class EmissionDataAdmin(admin.ModelAdmin):
    list_display = (
        'transportation_mode', 'transportation_distance', 'waste_weight_kg',
        'electricity_kWh', 'screentime_hours', 'dietary_meals',
        'transportation_emissions', 'waste_emissions', 'electricity_emissions',
        'screentime_emissions', 'dietary_emissions', 'total_emissions',
        'average_emissions'
    )

# @admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = (
        'transportation_emissions', 'waste_emissions', 
        'electricity_emissions', 'screentime_emissions', 
        'dietary_emissions', 'total_emissions', 'average_emissions'
    )
    
admin.site.register(User, UserModelAdmin)
admin.site.register(EmissionData, EmissionDataAdmin)
admin.site.register(Result, ResultAdmin)