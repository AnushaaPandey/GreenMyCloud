import 'react-native-gesture-handler'; // Ensure this is at the top
import React, { useState, useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from "react-native-rapi-ui";
import SplashScreen from "./src/screens/splash";
import AppNavigator from './src/navigation/AppNavigator';


const App = () => {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  }, []);

  return (
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {isShowSplashScreen ? <SplashScreen /> :
          <AppNavigator />
  }
        </GestureHandlerRootView>
      </ThemeProvider>
  );
};

export default App;





























