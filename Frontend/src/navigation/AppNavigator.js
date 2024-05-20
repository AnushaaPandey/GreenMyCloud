import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/splash";
import RegisterScreen from "../screens/auth/Register";
import Dashboard from "../screens/Dashboard";
import LoginScreen from "../screens/auth/Login";
import { create } from "apisauce";
import ForgotPasswordScreen from "../screens/auth/ForgotPassword";
import CarbonEmission from "../screens/CarbonEmissions";
import { fontSize } from "react-native-rapi-ui/constants/typography";
import Results from "../screens/green/results";
import { Settings } from "react-native";
import Setting from "../screens/Settings";


const Stack = createNativeStackNavigator();

export default function AppNavigator(){
  return(
    <NavigationContainer>
      <Stack.Navigator >
        {/* <Stack.Screen screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff', // Change header background color
          },
          headerTintColor: '#fff', // Change text color of header title
          headerTitleStyle: {
            fontWeight: 'bold',fontSize: 9 // Optionally adjust header title font weight
          },
        }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name= "CarbonEmissions" component={CarbonEmission} />
        <Stack.Screen name= "Results" component={Results} />
        <Stack.Screen name ="Setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


// // Import screens
// import HomePage from "../screens/HomePage";
// import Dashboard from "../screens/Dashboard";
// import LoginScreen from "../screens/auth/Login";
// import RegisterScreen from "../screens/auth/Register";
// import ForgotPasswordScreen from "../screens/auth/ForgotPassword";

// const AuthStack = createStackNavigator();

// const Auth = () => (
//   <AuthStack.Navigator screenOptions={{ headerShown: false }}>
//     <AuthStack.Screen name="Login" component={LoginScreen} />
//     <AuthStack.Screen name="Register" component={RegisterScreen} />
//     <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//   </AuthStack.Navigator>
// );

// const MainStack = createStackNavigator();

// const Main = () => (
//   <MainStack.Navigator screenOptions={{ headerShown: false }}>
//     <MainStack.Screen name="Home" component={HomePage} />
//     <MainStack.Screen name="Dashboard" component={Dashboard} />
//   </MainStack.Navigator>
// );

// const AppNavigator = () => {
//   const { user } = useContext(AuthContext);

//   return (
//     <NavigationContainer>
//       {user ? <Main /> : <Auth />}
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

















// import React, { useContext } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { AuthContext } from "../provider/AuthProvider";

// // Main
// import HomePage from "../screens/HomePage";
// import Dashboard from "../screens/Dashboard";
// import SplashScreen from "../screens/splash";

// // Auth screens
// import LoginScreen from "../screens/auth/Login";
// import RegisterScreen from "../screens/auth/Register";
// import ForgotPasswordScreen from "../screens/auth/ForgotPassword";



// const AuthStack = createStackNavigator();

// const Auth = () => {
//   return (
//     <AuthStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <AuthStack.Screen name="Login" component={LoginScreen} />
//       <AuthStack.Screen name="Register" component={RegisterScreen} />
//       <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//     </AuthStack.Navigator>
//   );
// };

// const MainStack = createStackNavigator();

// const Main = () => {
//   return (
//     <MainStack.Navigator
//       screenOptions={{
//         headerShown: false, 
//       }}
//     >
//       <MainStack.Screen name="Splash" component={SplashScreen} />
//       <MainStack.Screen name="Dashboard" component={Dashboard} />
//     </MainStack.Navigator>
//   );
// };

// export default () => {
//   const auth = useContext(AuthContext);
//   const user = auth.user;
  
//   return (
//     <NavigationContainer>
//        {user ? <MainStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };
