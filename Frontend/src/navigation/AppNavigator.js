import { create } from "apisauce";
import { Settings } from "react-native";
import React, { useContext } from "react";
import Setting from "../screens/Settings";
import Results from "../screens/results";
import Dashboard from "../screens/Dashboard";
import LoginScreen from "../screens/auth/Login";
import FAQScreen from "../screens/FAQ/FAQScreen";
import RegisterScreen from "../screens/auth/Register";
import CarbonEmission from "../screens/CarbonEmissions";
import { NavigationContainer } from "@react-navigation/native";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPassword";
import ChangePasswordScreen from "../screens/auth/ChangePassword";
import { fontSize } from "react-native-rapi-ui/constants/typography";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff', // Change header background color
          },
          headerTintColor: '#fff', // Change text color of header title
          headerTitleStyle: {
            fontWeight: 'bold', // Optionally adjust header title font weight
            fontSize: 18, // Adjust header title font size
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CarbonEmissions" component={CarbonEmission} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="FAQScreen" component={FAQScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}





















