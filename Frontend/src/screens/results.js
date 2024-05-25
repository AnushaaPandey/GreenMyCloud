import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Layout, Button, useTheme, themeColor } from 'react-native-rapi-ui';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

export default function EmissionsResultsScreen({ navigation }) {
    const { isDarkmode, setTheme } = useTheme();
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

    const renderChart = (label, data) => (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>{label}</Text>
            <BarChart
                data={{
                    labels: Object.keys(data),
                    datasets: [
                        {
                            data: Object.values(data),
                        },
                    ],
                }}
                width={width - 40}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );

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
        if (totalEmissions > 300) {
            message = "High emissions detected! Consider applying strict sustainable behaviors.";
        } else if (totalEmissions >= 150 && totalEmissions <= 300) {
            message = "Your emissions are between 150-300 kg CO2e. Consider reducing transportation, waste, and screentime.";
        } else {
            message = "Low carbon emissions detected. Keep up the good work!";
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
                        {renderChart('Emissions Breakdown', {
                            'Transportation': results.transportation_emissions,
                            'Waste': results.waste_emissions,
                            'Electricity': results.electricity_emissions,
                            'Screentime': results.screentime_emissions,
                            'Dietary': results.dietary_emissions,
                        })}
                    </>
                ) : (
                    <View style={styles.noResultsContainer}>
                        <Text>No results yet.</Text>
                    </View>
                )}
                <View style={styles.buttonContainer}>
                    <Button
                        text="Recalculate Emissions"
                        onPress={() => navigation.navigate('CalculateEmissions')}
                        style={{
                            backgroundColor: '#EDF6F9',
                            borderRadius: 8,
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
        paddingHorizontal: 20,
        marginBottom: 30,
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
