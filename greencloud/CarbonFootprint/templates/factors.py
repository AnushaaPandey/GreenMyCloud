# # emission_calculator.py


EMISSION_FACTORS = {
    "Nepal": {
        "Transportation": 0.14,  # kgCO2/km
        "Electricity": 0.82,  # kgCO2/kWh
        "Diet": 1.25,  # kgCO2/meal, 2.5kgco2/kg
        "Waste": 0.1 , # kgCO2/kg
        "screentime": (0.25) #energy consumption per hour
    }
}

def calculate_emissions(distance, electricity, waste, meals, screentime):
    # Normalize inputs
    distance_yearly = distance * 365 if distance > 0 else 0
    electricity_yearly = electricity * 12 if electricity > 0 else 0
    meals_yearly = meals * 365 if meals > 0 else 0
    waste_yearly = waste * 52 if waste > 0 else 0
    screentime_yearly = screentime * 40 if screentime > 0 else 0

    # Calculate carbon emissions using generic emission factors
    transportation_emissions = EMISSION_FACTORS["Nepal"]["Transportation"] * distance_yearly
    electricity_emissions = EMISSION_FACTORS["Nepal"]["Electricity"] * electricity_yearly
    diet_emissions = EMISSION_FACTORS["Nepal"]["Diet"] * meals_yearly
    waste_emissions = EMISSION_FACTORS["Nepal"]["Waste"] * waste_yearly
    screentime_emission = EMISSION_FACTORS["Nepal"]["screentime"] * screentime_yearly

    # Convert emissions to tonnes and round off to 2 decimal points
    transportation_emissions = round(transportation_emissions / 1000, 2)
    electricity_emissions = round(electricity_emissions / 1000, 2)
    diet_emissions = round(diet_emissions / 1000, 2)
    waste_emissions = round(waste_emissions / 1000, 2) 
    screentime_emission = round(screentime_emission / 1000, 2)

    # Calculate total emissions
    total_emissions = round(
        transportation_emissions + electricity_emissions + diet_emissions + waste_emissions + screentime_emission, 2
    )

    # Print the emissions
    print("Transportation emissions:", transportation_emissions)
    print("Electricity emissions:", electricity_emissions)
    print("Diet emissions:", diet_emissions)
    print("Waste emissions:", waste_emissions)
    print("Screentime emissions:", screentime_emission)
    print("Total emissions:", total_emissions)

    return {
        "transportation_emissions": transportation_emissions,
        "electricity_emissions": electricity_emissions,
        "diet_emissions": diet_emissions,
        "waste_emissions": waste_emissions,
        "screentime_emission": screentime_emission,
        "total_emissions": total_emissions
    }




# EMISSION_FACTORS = {
#     "Nepal": {
#         "Transportation": 0.14,  # kgCO2/km
#         "Electricity": 0.82,  # kgCO2/kWh
#         "Diet": 1.25,  # kgCO2/meal, 2.5kgco2/kg
#         "Waste": 0.1 , # kgCO2/kg
#         "screentime": (0.25) #energy consumption per hour
#     }
# }

# def calculate_emissions(country, distance, electricity, waste, meals, screentime):
#     # Normalize inputs
#     distance_yearly = distance * 365 if distance > 0 else 0
#     electricity_yearly = electricity * 12 if electricity > 0 else 0
#     meals_yearly = meals * 365 if meals > 0 else 0
#     waste_yearly = waste * 52 if waste > 0 else 0
#     screentime_yearly = screentime * 40 if screentime > 0 else 0

#     # Calculate carbon emissions
#     transportation_emissions = EMISSION_FACTORS[country]["Transportation"] * distance_yearly
#     electricity_emissions = EMISSION_FACTORS[country]["Electricity"] * electricity_yearly
#     diet_emissions = EMISSION_FACTORS[country]["Diet"] * meals_yearly
#     waste_emissions = EMISSION_FACTORS[country]["Waste"] * waste_yearly
#     screentime = EMISSION_FACTORS[country]["screentime"] * screentime_yearly

#     # Convert emissions to tonnes and round off to 2 decimal points
#     transportation_emissions = round(transportation_emissions / 1000, 2)
#     electricity_emissions = round(electricity_emissions / 1000, 2)
#     diet_emissions = round(diet_emissions / 1000, 2)
#     waste_emissions = round(waste_emissions / 1000, 2) 
#     screentime_emission = round(screentime / 1000, 2)

#     # Calculate total emissions
#     total_emissions = round(
#         transportation_emissions + electricity_emissions + diet_emissions + waste_emissions+screentime_emission, 2
#     )

#     print( {"transportation_emissions": transportation_emissions,
#         "electricity_emissions": electricity_emissions,
#         "diet_emissions": diet_emissions,
#         "waste_emissions": waste_emissions,
#         "screentime_emission": screentime_emission,
#         "total_emissions": total_emissions})

#     return {
#         "transportation_emissions": transportation_emissions,
#         "electricity_emissions": electricity_emissions,
#         "diet_emissions": diet_emissions,
#         "waste_emissions": waste_emissions,
#         "screentime_emission": screentime_emission,
#         "total_emissions": total_emissions
        
#     }

