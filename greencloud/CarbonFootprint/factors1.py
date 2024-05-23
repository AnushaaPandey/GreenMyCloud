
# def calculate_total_and_average_emissions(CLIMATIQ_API_KEY, transportation_mode, transportation_distance, waste_weight_kg, electricity_kWh, screentime_hours, dietary_meals, request, days_in_year=365):
#     transportation_emissions = transportation(CLIMATIQ_API_KEY, transportation_mode, transportation_distance, request)
#     waste_emissions = waste_emission(CLIMATIQ_API_KEY, waste_weight_kg, request)
#     electricity_emissions = electricity_emission(CLIMATIQ_API_KEY, electricity_kWh, request)
#     screentime_emissions = screentime_emission(screentime_hours)
#     dietary_emissions = dietary_emission(dietary_meals)

#     # Calculate daily total emissions
#     total_emissions_daily = (
#         transportation_emissions['co2e'] + 
#         waste_emissions['co2e'] + 
#         electricity_emissions['co2e'] + 
#         screentime_emissions + 
#         dietary_emissions
#     )

#     # Calculate daily average emissions
#     total_count = 5
#     average_emissions_daily = total_emissions_daily / total_count

#     # Calculate yearly total emissions
#     total_emissions_yearly = total_emissions_daily * days_in_year

#     # Calculate yearly average emissions
#     average_emissions_yearly = average_emissions_daily * days_in_year

#     input_data = EmissionData.objects.create(
#         transportation_mode=transportation_mode,
#         transportation_distance=transportation_distance,
#         waste_weight_kg=waste_weight_kg,
#         electricity_kWh=electricity_kWh,
#         screentime_hours=screentime_hours,
#         dietary_meals=dietary_meals,
#         transportation_emissions=transportation_emissions['co2e'],
#         waste_emissions=waste_emissions['co2e'],
#         electricity_emissions=electricity_emissions['co2e'],
#         screentime_emissions=screentime_emissions,
#         dietary_emissions=dietary_emissions,
#         total_emissions=total_emissions_daily,  # Store daily emissions
#         average_emissions=average_emissions_daily  # Store daily average emissions
#     )

#     result = Result.objects.create(
#         transportation_emissions=transportation_emissions['co2e'],
#         waste_emissions=waste_emissions['co2e'],
#         electricity_emissions=electricity_emissions['co2e'],
#         screentime_emissions=screentime_emissions,
#         dietary_emissions=dietary_emissions,
#         total_emissions=total_emissions_yearly,  # Store yearly emissions
#         average_emissions=average_emissions_yearly  # Store yearly average emissions
#     )

#     return {
#         "transportation_emissions": transportation_emissions,
#         "waste_emissions": waste_emissions,
#         "electricity_emissions": electricity_emissions,
#         "screentime_emissions": screentime_emissions,
#         "dietary_emissions": dietary_emissions,
#         "total_emissions_daily": total_emissions_daily,
#         "average_emissions_daily": average_emissions_daily,
#         "total_emissions_yearly": total_emissions_yearly,
#         "average_emissions_yearly": average_emissions_yearly
#     }
