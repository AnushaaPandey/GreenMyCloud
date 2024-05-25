import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider, useTheme } from 'react-native-rapi-ui';
import LoginScreen from "../screens/auth/Login";
import RegisterScreen from "../screens/auth/Register";
import ForgotPasswordScreen from "../screens/auth/ForgotPassword";
import Dashboard from "../screens/Dashboard";
import CarbonEmission from "../screens/CarbonEmissions";
import Setting from "../screens/Settings";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";
import UserProfile from "../screens/user";
import FAQScreen from "../screens/FAQ/FAQScreen";
import ChangePasswordScreen from "../screens/auth/ChangePassword";
import KhaltiScreen from "../screens/Khalti";
import EmissionsResultsScreen from "../screens/results";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import History from "../screens/history"
import { View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  const { isDarkmode } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'CalculateEmission') {
            iconName = 'calculator';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else if (route.name === 'Khalti') {
            iconName = 'cash';
          } else if (route.name === 'History') {
            iconName = 'bar-chart';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: isDarkmode ? '#000' : '#fff',
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="CalculateEmission" component={CarbonEmission} />
      <Tab.Screen name="Khalti" component={KhaltiScreen} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Dashboard" component={DashboardTabs} />
          <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="FAQScreen" component={FAQScreen} />
          <Stack.Screen name="EmissionsResults" component={EmissionsResultsScreen} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigator;
