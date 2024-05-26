import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Layout, Button, useTheme, themeColor } from 'react-native-rapi-ui';
import axios from 'axios';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

function BarChartScreen({ results }) {
    return (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Emissions Breakdown</Text>
            <BarChart
                data={{
                    labels: ['Transportation', 'Waste', 'Electricity', 'Screentime', 'Dietary'],
                    datasets: [{ data: [results.transportation_emissions, results.waste_emissions, results.electricity_emissions, results.screentime_emissions, results.dietary_emissions] }],
                }}
                width={width - 40}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                }}
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
        </View>
    );
}

function LineChartScreen({ results }) {
    return (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Emissions Over Time</Text>
            <LineChart
                data={{
                    labels: ['Transportation', 'Waste', 'Electricity', 'Screentime', 'Dietary'],
                    datasets: [{ data: [results.transportation_emissions, results.waste_emissions, results.electricity_emissions, results.screentime_emissions, results.dietary_emissions] }],
                }}
                width={width - 40}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
        </View>
    );
}

function EmissionsResultsScreen({ navigation }) {
    const { isDarkmode } = useTheme();
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://10.0.2.2:8000/results/');
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <View style={styles.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
            </Layout>
        );
    }

    let message = "";
    if (results && results.total_emissions) {
        const totalEmissions = results.total_emissions;
        if (totalEmissions > 6000) {
            message = "High emissions detected! Consider reducing your emissions. High carbon emissions indicate significant environmental impact, requiring comprehensive changes across various aspects of life. Transportation is a major factor, so prioritize using public transportation, carpooling, or transitioning to electric vehicles. For waste management, adopt a zero-waste lifestyle by recycling, composting, and reducing single-use plastics. In terms of food, reduce meat and dairy consumption, which are carbon-intensive, and opt for plant-based diets. Electricity usage can be minimized by investing in energy-efficient appliances, using LED lighting, and incorporating renewable energy sources like solar panels. Reducing screentime not only cuts down electricity use but also encourages more active, outdoor activities that are beneficial for health and the environment.";
        } else if (totalEmissions >= 2000 && totalEmissions <= 4000) {
            message = "Your emissions are average. Keep up the good work! With average carbon emissions, small.";
        } else if (totalEmissions >= 4000 && totalEmissions <= 6000) {
            message = "Your emissions are close to high further refinements in dailys. Reducing electricity consumption can be achieved by using smart thermostats, turning off appliances when not in use, and participating in energy-saving programs. Limiting screentime by setting specific hours for device usage and exploring outdoor hobbies can also contribute to lower carbon footprints.";
        } else {
            message = "Low emissions detected. Great job! With low carbon emissions are already on a good path but can still enhance their sustainability efforts. In transportation, continue using eco-friendly options like cycling, walking, or electric vehicles. Waste management practices should include strict adherence to recycling, composting, and supporting products from sustainable brands. Maintain a food regimen rich in plant-based options, ideally sourced locally to reduce transportation emissions. Electricity usage should be minimal, with continued use of energy-efficient appliances and renewable energy sources. For screentime, keep encouraging outdoor activities and community involvement to stay active and reduce electricity dependence.";
        }
    }

    return (
        <Layout>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.headerContainer}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            color: isDarkmode ? themeColor.white100 : themeColor.black,
                        }}
                    >
                        Emissions Results
                    </Text>
                </View>
                {results && Object.keys(results).length > 0 ? (
                    <>
                        <View style={styles.resultsContainer}>
                            <Text style={styles.resultText}>Total Emissions: {results.total_emissions.toFixed(2)} kg CO2e</Text>
                            <Text style={styles.resultText}>Average Emissions: {results.average_emissions.toFixed(2)} kg CO2e</Text>
                            <Text style={styles.message}>{message}</Text>
                        </View>
                        <NavigationContainer independent={true}>
                            <Tab.Navigator
                                screenOptions={({ route }) => ({
                                    tabBarIcon: ({ color, size }) => {
                                        let iconName;
                                        if (route.name === 'Bar Chart') {
                                            iconName = 'bar-chart';
                                        } else if (route.name === 'Line Chart') {
                                            iconName = 'bar-chart';
                                        }
                                        return <Ionicons name={iconName} size={size} color={color} />;
                                    },
                                    tabBarActiveTintColor: themeColor.primary,
                                    tabBarInactiveTintColor: 'gray',
                                })}
                            >
                                <Tab.Screen name="Bar Chart">
                                    {() => <BarChartScreen results={results} />}
                                </Tab.Screen>
                                <Tab.Screen name="Line Chart">
                                    {() => <LineChartScreen results={results} />}
                                </Tab.Screen>
                            </Tab.Navigator>
                        </NavigationContainer>
                    </>
                ) : (
                    <View style={styles.noResultsContainer}>
                        <Text>No results yet.</Text>
                    </View>
                )}
                <View style={styles.buttonContainer}>
                    <Button
                        text="Go Back"
                        onPress={() => navigation.navigate('Dashboard')}
                        style={{
                            backgroundColor: '#EDF6F9',
                            borderRadius: 5,
                        }}
                    />
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    resultsContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    resultText: {
        fontSize: 18,
        marginVertical: 5,
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    chartTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    buttonContainer: {
        paddingHorizontal: 110,
        marginTop: 0,
        marginBottom: 0,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    message: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
});

export default EmissionsResultsScreen;
