import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image } from 'react-native';
import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';
// import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios';

export default function LoginScreen({navigation}) {
  const { isDarkmode, setTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const val = useContext(AuthContext);
  // const navigation = useNavigation();

  const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8000/login/', {
          username: username,
          password: password
        });
        
        // Handle successful login response
        console.log('Login successful:', response.data);
        // Navigate to the next screen or perform other actions
      } catch (error) {
        // Handle login error
        console.error('Login error:', error.response.data);
        // Display error message to the user
        Alert.alert('Login failed', 'Invalid username or password');
      }
    };

  // const handleLogin = () => {
  //   // Simulate login by validating fields
  //   if (!username || !password) {
  //     alert('Please enter username and password');
  //     return;
  //   }
 
    // Simulate successful login
    console.log('Login successful');
    // For simplicity, navigate to the home page after login
    navigation.navigate('Dashboard');
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isDarkmode ? '#17171E' : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require('../../../assets/Images/login.png')}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              style={{ alignSelf: 'center', padding: 30 }}
              size="h3"
            >
              Login
            </Text>
            <Text>{val}</Text>
            <Text>Username</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
            <Text>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              title="Login"
              onPress={(handleLogin) => {  navigation.navigate('Dashboard');
             
              }
            }
              style={{ marginTop: 20 }}
            />
            <TouchableOpacity
              onPress={() => {
                // Navigate to the forgot password page
                navigation.navigate('ForgotPassword');
              }}
            >
              <Text style={{ textAlign: 'center', marginTop: 10 }}>Forgot Password?</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                justifyContent: 'center',
              }}
            >
              <Text size="md">Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  // Navigate to the register page
                  navigation.navigate('Register');
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{ marginLeft: 5 }}
                >
                  Register here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
