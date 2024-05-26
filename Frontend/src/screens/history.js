import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const History = () => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/results/');
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!results || Object.keys(results).length === 0) {
        return (
            <View style={styles.center}>
                <Text>No results yet.</Text>
            </View>
        );
    }

    const chartData = {
        labels: ['Transportation', 'Waste', 'Electricity', 'Screentime', 'Dietary'],
        datasets: [
            {
                data: [
                    results.transportation_emissions,
                    results.waste_emissions,
                    results.electricity_emissions,
                    results.screentime_emissions,
                    results.dietary_emissions
                ]
            }
        ]
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.chartTitle}>Previous Results</Text>
                <LineChart
                    data={chartData}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726'
                        }
                    }}
                    bezier
                    style={styles.chartStyle}
                />
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultText}>Transportation Emissions: {results.transportation_emissions}</Text>
                    <Text style={styles.resultText}>Waste Emissions: {results.waste_emissions}</Text>
                    <Text style={styles.resultText}>Electricity Emissions: {results.electricity_emissions}</Text>
                    <Text style={styles.resultText}>Screentime Emissions: {results.screentime_emissions}</Text>
                    <Text style={styles.resultText}>Dietary Emissions: {results.dietary_emissions}</Text>
                    <Text style={styles.resultText}>Total Emissions: {results.total_emissions}</Text>
                    <Text style={styles.resultText}>Average Emissions: {results.average_emissions}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartTitle: {
        textAlign: 'left',
        marginBottom: 10,
        fontFamily: 'Arial',
        fontSize: 16,
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
    },
    resultsContainer: {
        marginTop: 20,
        alignItems: 'flex-start',
        width: '100%',
    },
    resultText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default History;
