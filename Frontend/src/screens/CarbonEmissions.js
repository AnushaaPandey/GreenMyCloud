import React, { useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Alert, Switch } from 'react-native';
import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function CalculateEmissionsScreen({ navigation }) {
    const { isDarkmode, setTheme } = useTheme();
    const [transportationMode, setTransportationMode] = useState("");
    const [transportationDistance, setTransportationDistance] = useState("");
    const [wasteWeight, setWasteWeight] = useState("");
    const [electricityUsage, setElectricityUsage] = useState("");
    const [screentimeHours, setScreentimeHours] = useState("");
    const [dietaryMeals, setDietaryMeals] = useState("");
    const [loading, setLoading] = useState(false);

    const transportationModes = [
        { key:1, label: "Select mode", value: "" },
        { key:2, label: "Motorbike", value: "motorbike" },
        { key:3, label: "Electric Car", value: "ev_car" },
        { key:4, label: "Car", value: "car" },
        { key:5, label: "Diesel Car", value: "diesel_car" },
        { key:6, label: "Petrol Car", value: "petrol_car" },
        { key:7, label: "Bus", value: "bus" },
        { key:8, label: "Taxi", value: "taxi" }
    ];

    const calculateEmissions = async () => {
        if (!transportationMode || !transportationDistance || !wasteWeight || !electricityUsage || !screentimeHours || !dietaryMeals) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://10.0.2.2:8000/calculate_emission/', {
                transportation_mode: transportationMode,
                transportation_distance: parseFloat(transportationDistance),
                waste_weight_kg: parseFloat(wasteWeight),
                electricity_kWh: parseFloat(electricityUsage),
                screentime_hours: parseFloat(screentimeHours),
                dietary_meals: parseFloat(dietaryMeals)
            });

            console.log("Calculation successful:", response.data);
            Alert.alert("Success", "Emissions calculated successfully.");
            navigation.navigate('EmissionsResults', { results: response.data });
        } catch (error) {
            console.error("Calculation failed:", error.response ? error.response.data : error.message);
            Alert.alert("Error", error.response ? error.response.data.error : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
            <Layout>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View
                        style={{
                            flex: 3,
                            paddingHorizontal: 20,
                            paddingBottom: 30,
                            backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
                        }}
                    >
                        <Text>Transportation Mode</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 10,}}
                            placeholder="motorbike,car,bus,taxi,ev_car, diesel_car,petrol_car"
                            keyboardType="text"
                            value={transportationMode}
                            onChangeText={(text) => setTransportationMode(text)}
                        />
                        
                        <Text>Transportation Distance (km)</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 10 }}
                            placeholder="Enter distance in km"
                            keyboardType="numeric"
                            value={transportationDistance}
                            onChangeText={(text) => setTransportationDistance(text)}
                        />
                        <Text>Waste Weight (kg)</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 10 }}
                            placeholder="Enter weight in kg"
                            keyboardType="numeric"
                            value={wasteWeight}
                            onChangeText={(text) => setWasteWeight(text)}
                        />
                        <Text>Electricity Usage (Wh)</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 10 }}
                            placeholder="Enter electricity usage in Wh"
                            keyboardType="numeric"
                            value={electricityUsage}
                            onChangeText={(text) => setElectricityUsage(text)}
                        />
                        <Text>Screentime Hours</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 10 }}
                            placeholder="Enter screentime per day"
                            keyboardType="numeric"
                            value={screentimeHours}
                            onChangeText={(text) => setScreentimeHours(text)}
                        />
                        <Text>Dietary Meals</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 10 }}
                            placeholder="Enter number of meals per day"
                            keyboardType="numeric"
                            value={dietaryMeals}
                            onChangeText={(text) => setDietaryMeals(text)}
                        />
                        <Button
                            text={loading ? "Loading..." : "Calculate Emissions"}
                            onPress={calculateEmissions}
                            style={{
                                marginTop: 15,
                                marginBottom: 10,
                                backgroundColor: '#EDF6F9',
                                borderRadius: 8,
                            }}
                            disabled={loading}
                        />
                    </View>
                </ScrollView>
            </Layout>
        </KeyboardAvoidingView>
    );
}
