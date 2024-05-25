import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

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
        return <View><Text>Loading...</Text></View>;
    }

    if (!results || Object.keys(results).length === 0) {
        return <View><Text>No results yet.</Text></View>;
    }

    return (
        <View>
            <Text>Previous Results</Text>
            <View>
                <Text>Transportation Emissions: {results.transportation_emissions}</Text>
                <Text>Waste Emissions: {results.waste_emissions}</Text>
                <Text>Electricity Emissions: {results.electricity_emissions}</Text>
                <Text>Screentime Emissions: {results.screentime_emissions}</Text>
                <Text>Dietary Emissions: {results.dietary_emissions}</Text>
                <Text>Total Emissions: {results.total_emissions}</Text>
                <Text>Average Emissions: {results.average_emissions}</Text>
            </View>
        </View>
    );
};

export default History;
