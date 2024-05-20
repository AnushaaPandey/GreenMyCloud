import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EMISSION_FACTORS = {
  "Nepal": {
    "Transportation": 0.14,  // kgCO2/km
    "Electricity": 0.82,  // kgCO2/kWh
    "Diet": 1.25,  // kgCO2/meal
    "Waste": 0.1 ,  // kgCO2/kg
    "screentime": 0.25 // energy consumption per hour
  }
};

const calculate_emissions = (distance, electricity, waste, meals, screentime) => {
  // Normalize inputs
  distance = distance || 20;
  electricity = electricity || 40;
  waste = waste || 60;
  meals = meals || 90;
  screentime = screentime || 80;

  const distance_yearly = distance * 365;
  const electricity_yearly = electricity * 12;
  const meals_yearly = meals * 365;
  const waste_yearly = waste * 52;
  const screentime_yearly = screentime * 40;

  // Calculate carbon emissions using generic emission factors
  const transportation_emissions = EMISSION_FACTORS["Nepal"]["Transportation"] * distance_yearly;
  const electricity_emissions = EMISSION_FACTORS["Nepal"]["Electricity"] * electricity_yearly;
  const diet_emissions = EMISSION_FACTORS["Nepal"]["Diet"] * meals_yearly;
  const waste_emissions = EMISSION_FACTORS["Nepal"]["Waste"] * waste_yearly;
  const screentime_emission = EMISSION_FACTORS["Nepal"]["screentime"] * screentime_yearly;

  // Convert emissions to tonnes and round off to 2 decimal points
  const transportation_emissions_tonnes = roundToTwoDecimals(transportation_emissions / 1000);
  const electricity_emissions_tonnes = roundToTwoDecimals(electricity_emissions / 1000);
  const diet_emissions_tonnes = roundToTwoDecimals(diet_emissions / 1000);
  const waste_emissions_tonnes = roundToTwoDecimals(waste_emissions / 1000);
  const screentime_emission_tonnes = roundToTwoDecimals(screentime_emission / 1000);

  // Calculate total emissions
  const total_emissions = roundToTwoDecimals(
    transportation_emissions_tonnes + electricity_emissions_tonnes + diet_emissions_tonnes + waste_emissions_tonnes + screentime_emission_tonnes
  );

  return {
    transportation_emissions: transportation_emissions_tonnes,
    electricity_emissions: electricity_emissions_tonnes,
    diet_emissions: diet_emissions_tonnes,
    waste_emissions: waste_emissions_tonnes,
    screentime_emission: screentime_emission_tonnes,
    total_emissions
  };
};

const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

const Results = ({ route }) => {
  const { electricity, waste, diet, screenTime } = route.params;
  const emissions = calculate_emissions(234, electricity, waste, diet, screenTime);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emission Results</Text>
      <Text>Electricity Emissions: {emissions.electricity_emissions} tonnes CO2/year</Text>
      <Text>Waste Emissions: {emissions.waste_emissions} tonnes CO2/year</Text>
      <Text>Diet Emissions: {emissions.diet_emissions} tonnes CO2/year</Text>
      <Text>Screen Time Emissions: {emissions.screentime_emission} tonnes CO2/year</Text>
      <Text style={styles.total}>Total Emissions: {emissions.total_emissions} tonnes CO2/year</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default Results;

















// import React, { useEffect } from "react";
// import { View } from "react-native";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import axios from "axios";

// const Results = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/results/");
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (data) {
//       Highcharts.chart("container", {
//         chart: {
//           type: "pie",
//         },
//         title: {
//           text: "Carbon Emissions",
//         },
//         series: [
//           {
//             name: "Emissions",
//             data: [
//               ["Transportation", data.transportation_emissions],
//               ["Electricity", data.electricity_emissions],
//               ["Diet", data.diet_emissions],
//               ["Waste", data.waste_emissions],
//               ["Screentime", data.screentime_emission],
//             ],
//           },
//         ],
//       });
//     }
//   }, [data]);

//   return <View style={{ height: 500 }}>
//     <div id="container"></div>
//   </View>;
// };

// export default Results;
