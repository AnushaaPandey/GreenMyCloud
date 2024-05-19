import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarbonEmission = () => {
  return (
    <View style={styles.container}>
      {/* Div box with placeholders */}
      <View style={styles.box}>
        <Text>Electricity Usage</Text>
        {/* Placeholder for Electricity Usage */}
      </View>
      <View style={styles.box}>
        <Text>Waste Emission</Text>
        {/* Placeholder for Waste Emission */}
      </View>
      <View style={styles.box}>
        <Text>Dietary</Text>
        {/* Placeholder for Dietary */}
      </View>
      <View style={styles.box}>
        <Text>Screen Time</Text>
        {/* Placeholder for Screen Time */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CarbonEmission;
