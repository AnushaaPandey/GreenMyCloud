import React from "react";
import { View, Text, StyleSheet, Button  } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from "./auth/Register";



export default function HomePage({ navigation }) {
    // const handleLoginRegister = () => {

    //     // Navigate to the login/register page
    //     // Replace 'LoginRegisterPage' with the actual name of your login/register page component
    //     navigation.navigate('Registration');
    //   };
  return (
    <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Welcome to the Home Page!</Text>
      <Text style={styles.subtitle}>This is where your app's main content would go.</Text>
    </View>
    <View style={styles.buttonContainer}>
      <Button title="Login/Register" onPress={(RegisterScreen) => navigation.navigate('Register')} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    margin: 45,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#FCF7FF",
  },
  content: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#003049",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#2E382E",
  },
  buttonContainer: {
    marginBottom: 0,
    width: "100%",
    color: "#3E4C5E",
  },
});
