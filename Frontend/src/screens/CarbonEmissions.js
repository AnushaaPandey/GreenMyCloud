
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CarbonEmission = () => {
  const [electricity, setElectricity] = useState('');
  const [waste, setWaste] = useState('');
  const [diet, setDiet] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const navigation = useNavigation();

  const handleCalculate = () => {
    navigation.navigate('Results', {
      electricity: parseFloat(electricity),
      waste: parseFloat(waste),
      diet: parseFloat(diet),
      screenTime: parseFloat(screenTime)
    });
  };

  return (
    <View style={styles.parentContainer}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Electricity Usage</Text>
        <TextInput
          style={styles.input}
          placeholder="kWh/month"
          keyboardType="numeric"
          value={electricity}
          onChangeText={setElectricity}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Waste Emission</Text>
        <TextInput
          style={styles.input}
          placeholder="kg/week"
          keyboardType="numeric"
          value={waste}
          onChangeText={setWaste}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Dietary</Text>
        <TextInput
          style={styles.input}
          placeholder="meals/day"
          keyboardType="numeric"
          value={diet}
          onChangeText={setDiet}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Screen Time</Text>
        <TextInput
          style={styles.input}
          placeholder="hours/day"
          keyboardType="numeric"
          value={screenTime}
          onChangeText={setScreenTime}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calculate Emissions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#899E8B',
  },
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingLeft: 10,
    backgroundColor: '#899E8B',
  },
  inputGroup: {
    width: '80%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#080705',
    padding: 15,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CarbonEmission;

