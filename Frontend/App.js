import React, { useState, useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from "react-native-rapi-ui";
// import { AuthProvider } from "./src/Provider/AuthProvider";
import SplashScreen from "./src/screens/splash";
import AppNavigator from "./src/navigation/AppNavigator";
import 'react-native-gesture-handler'; // Ensure this is at the top
import axios from 'axios'; // Import Axios
import Dashboard from "./src/screens/Dashboard";



axios.defaults.baseURL = 'http://localhost:8000'; 

const App = () => {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {isShowSplashScreen ? <SplashScreen /> :
          <AppNavigator />
  }
        </GestureHandlerRootView>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;




























// import React from "react";
// import { View, StyleSheet } from "react-native";
// import { LogBox } from "react-native";
// import { ThemeProvider } from "react-native-rapi-ui";
// import SplashScreen from "./src/screens/splash";
// import { useEffect, useState } from "react";
// import HomePage from "./src/screens/HomePage";
// import AppNavigator  from "./src/navigation/AppNavigator"
// import LoginScreen from "./src/screens/auth/Login";

// window.React1 = require('react');

// // Add this in your component file
// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

// export default function App() {
//   return(
//     <AppNavigator />
//   );
  
 
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });







// import React, { useState, useEffect, useContext } from "react";
// import { View, StyleSheet } from "react-native";
// import { ThemeProvider, useTheme } from "react-native-rapi-ui";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";


// import SplashScreen from "./src/screens/splash";
// import HomePage from "./src/screens/HomePage";
// import Dashboard from "./src/screens/Dashboard";
// import LoginScreen from "./src/screens/auth/Login";
// import RegisterScreen from "./src/screens/auth/Register";
// import ForgotPasswordScreen from "./src/screens/auth/ForgotPassword";


// const AuthContext = React.createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Change this to `null` if user is not logged in
//   // Mock login/logout functionality
//   const login = () => setUser({ name: "User" });
//   const logout = () => setUser(null);
  
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

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
//       <MainStack.Screen name="Home" component={HomePage} />
//       <MainStack.Screen name="Dashboard" component={Dashboard} />
//     </MainStack.Navigator>
//   );
// };

// export default function App() {
//   const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
  
//   useEffect(() => {
//     setTimeout(() => {
//       setIsShowSplashScreen(false);
//     }, 3000);
//   }, []);

//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         <View style={styles.container}>
//           {isShowSplashScreen ? (
//             <SplashScreen />
//           ) : (
//             <AppNavigator />
//           )}
//         </View>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }

// const AppNavigator = () => {
//   const { user } = useContext(AuthContext);

//   return (
//     <NavigationContainer>
//       {user ? <Main /> : <Auth />}
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
