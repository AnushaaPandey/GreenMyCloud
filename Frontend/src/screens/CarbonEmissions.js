import React, { useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Alert, Switch } from 'react-native';
import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function CalculateEmissionsScreen({ navigation }) {
    const { isDarkmode, setTheme } = useTheme();
    const [transportationMode, setTransportationMode] = useState("");
    const [transportationDistance, setTransportationDistance] = useState("");
    const [wasteWeight, setWasteWeight] = useState("");
    const [electricityUsage, setElectricityUsage] = useState("");
    const [screentimeHours, setScreentimeHours] = useState("");
    const [dietaryMeals, setDietaryMeals] = useState("");
    const [loading, setLoading] = useState(false);

    const calculateEmissions = async () => {
        if (!transportationMode || !transportationDistance || !wasteWeight || !electricityUsage || !screentimeHours || !dietaryMeals) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/calculate-emissions/', {
                transportation_mode: transportationMode,
                transportation_distance: parseFloat(transportationDistance),
                waste_weight_kg: parseFloat(wasteWeight),
                electricity_kWh: parseFloat(electricityUsage),
                screentime_hours: parseFloat(screentimeHours),
                dietary_meals: parseFloat(dietaryMeals)
            });
            console.log("Calculation successful:", response.data);
            Alert.alert("Success", "Emissions calculated successfully.");
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
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 0 }}>
                        <Switch
                            style={{ marginLeft: 0 }}
                            value={isDarkmode}
                            onValueChange={() => setTheme(isDarkmode ? 'light' : 'dark')}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: isDarkmode ? '#17171E' : themeColor.white100,
                        }}
                    >
                        <Text
                            fontWeight="bold"
                            size="h3"
                            style={{ alignSelf: 'center', padding: 30 }}
                        >
                            Calculate Emissions
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 3,
                            paddingHorizontal: 20,
                            paddingBottom: 20,
                            backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
                        }}
                    >
                        <Text>Transportation Mode</Text>
                        <View style={{
                            borderWidth: 1, 
                            borderColor: '#ccc', 
                            borderRadius: 5, 
                            marginBottom: 5, 
                            marginTop: 5,
                            height: 50, // Ensure height is set
                            justifyContent: 'center' // Center the text vertically
                        }}>
                            <Picker
                                selectedValue={transportationMode}
                                onValueChange={(itemValue) => setTransportationMode(itemValue)}
                                style={{ height: 30 }} // Ensure Picker is visible
                            >
                                <Picker.Item label="Select mode" value="" />
                                <Picker.Item label="Motorbike" value="motorbike" />
                                <Picker.Item label="Electric Car" value="ev_car" />
                                <Picker.Item label="Car" value="car" />
                                <Picker.Item label="Diesel Car" value="diesel_car" />
                                <Picker.Item label="Petrol Car" value="petrol_car" />
                                <Picker.Item label="Bus" value="bus" />
                                <Picker.Item label="Walk" value="walk" />
                            </Picker>
                        </View>
                        <Text>Transportation Distance (km)</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 5 }}
                            placeholder="Enter distance in km"
                            keyboardType="numeric"
                            value={transportationDistance}
                            onChangeText={(text) => setTransportationDistance(text)}
                        />
                        <Text>Waste Weight (kg)</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 5 }}
                            placeholder="Enter weight in kg"
                            keyboardType="numeric"
                            value={wasteWeight}
                            onChangeText={(text) => setWasteWeight(text)}
                        />
                        <Text>Electricity Usage (kWh)</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 5 }}
                            placeholder="Enter electricity usage in kWh"
                            keyboardType="numeric"
                            value={electricityUsage}
                            onChangeText={(text) => setElectricityUsage(text)}
                        />
                        <Text>Screentime Hours</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 5 }}
                            placeholder="Enter screentime in hours"
                            keyboardType="numeric"
                            value={screentimeHours}
                            onChangeText={(text) => setScreentimeHours(text)}
                        />
                        <Text>Dietary Meals</Text>
                        <TextInput
                            containerStyle={{ marginBottom: 5, marginTop: 5 }}
                            placeholder="Enter number of meals"
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
