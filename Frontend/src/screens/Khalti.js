import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from 'react-native-rapi-ui';

const KhaltiScreen = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Khalti Screen</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default KhaltiScreen;
