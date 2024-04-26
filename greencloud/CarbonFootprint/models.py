from django.db import models
from .factors import calculate_emissions

# Create your models here.


class EmissionData(models.Model):
    transportation_emissions = models.FloatField()
    electricity_emissions = models.FloatField()
    diet_emissions = models.FloatField()
    waste_emissions = models.FloatField()
    screentime_emission = models.FloatField()
    total_emissions = models.FloatField()

# views.py
from .models import EmissionData

def carbon_calculator(request):
    if request.method == 'POST':
        # Calculate emissions data
        emissions_data = calculate_emissions(distance, electricity, waste, meals, screentime)

        # Save emissions data to the database
        emission_record = EmissionData.objects.create(
            transportation_emissions=emissions_data["transportation_emissions"],
            electricity_emissions=emissions_data["electricity_emissions"],
            diet_emissions=emissions_data["diet_emissions"],
            waste_emissions=emissions_data["waste_emissions"],
            screentime_emission=emissions_data["screentime_emission"],
            total_emissions=emissions_data["total_emissions"]
        )

        # Optionally, you can also save other relevant data along with emissions_data
        # For example:
        # emission_record.user = request.user
        # emission_record.save()

        return render(request, 'rest.html', {'emissions_data': emissions_data})
    else:
        return render(request, 'calc.html')
