import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';

const SplashScreen = () => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  return (
    <View style={styles.splashContainer}>
      <Animated.View style={[styles.imageContainer, { opacity: fadeAnimation }]}>
        <Image style={styles.image} source={require('../../assets/icons/splassh.png')} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#839788',
    height: 100,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});

export default SplashScreen;



















// import React, { useEffect, useRef } from "react";
// import { StyleSheet, View, Image, Animated } from "react-native";
// import icon from "../../assets/icons/splassh.png";

// export default function SplashScreen() {
//   const fadeAnimation = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnimation, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnimation]);
//   const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
//   useEffect(() => {
//     setTimeout(() => {
//       setIsShowSplashScreen(false);
//     }, 3000);
//   });

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[styles.imageContainer, { opacity: fadeAnimation }]}
//       >
//         <Image style={styles.image} source={icon} />
//         </Animated.View>
//      <View style={styles.container}>
//      {isShowSplashScreen ? <SplashScreen /> : <LoginScreen />}
//    </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor:"#839788",
//   },
//   imageContainer: {
//     borderRadius: 20,
//     overflow: "hidden",
//   },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: "cover",
//   },
// });