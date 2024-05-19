// // EmissionCalculatorPage.js

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import { calculate_emissions } from '.\greencloud\CarbonFootprint\factors.py'; // Import your backend code

// export default function EmissionCalculatorPage() {
//   const [distance, setDistance] = useState('');
//   const [electricity, setElectricity] = useState('');
//   const [waste, setWaste] = useState('');
//   const [meals, setMeals] = useState('');
//   const [screentime, setScreentime] = useState('');
//   const [totalEmissions, setTotalEmissions] = useState(null);

//   const handleCalculate = () => {
//     const emissions = calculate_emissions(distance, electricity, waste, meals, screentime);
//     setTotalEmissions(emissions);
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Emission Calculator</Text>
//       <TextInput
//         style={{ marginBottom: 10 }}
//         placeholder="Distance (km)"
//         onChangeText={setDistance}
//         value={distance}
//       />
//       <TextInput
//         style={{ marginBottom: 10 }}
//         placeholder="Electricity (kWh)"
//         onChangeText={setElectricity}
//         value={electricity}
//       />
//       <TextInput
//         style={{ marginBottom: 10 }}
//         placeholder="Waste (kg)"
//         onChangeText={setWaste}
//         value={waste}
//       />
//       <TextInput
//         style={{ marginBottom: 10 }}
//         placeholder="Meals"
//         onChangeText={setMeals}
//         value={meals}
//       />
//       <TextInput
//         style={{ marginBottom: 10 }}
//         placeholder="Screentime (hours)"
//         onChangeText={setScreentime}
//         value={screentime}
//       />
//       <Button title="Calculate Emissions" onPress={handleCalculate} />
//       {totalEmissions !== null && (
//         <Text style={{ marginTop: 20 }}>Total Emissions: {totalEmissions}</Text>
//       )}
//     </View>
//   );
// }
