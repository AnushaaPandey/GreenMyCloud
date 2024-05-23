
import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Alert, Switch } from 'react-native';
import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';
import { AuthContext } from "../../Provider/AuthProvider";
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const val = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        username: username,
        password: password
      });
     
    if (response && response.data) {
      console.log('Login successful:', response.data);
      navigation.navigate('Dashboard');
    } else {
      console.error('Login failed: Response data is missing');
      Alert.alert('Login failed', 'An unexpected error occurred');
    }
  } catch (error) {
    if (error.response && error.response.data) {
      // Server responded with an error message
      const errorMessage = error.response.data.detail;
      if (errorMessage.includes('username')) {
        Alert.alert('Login failed', 'Username does not exist');
      } else if (errorMessage.includes('password')) {
        Alert.alert('Login failed', 'Incorrect password');
      } else {
        Alert.alert('Login failed', errorMessage);
      }
    } else {
      // Handle network errors or other unexpected errors
      console.error('Login error:', error);
      Alert.alert('Login failed', 'An unexpected error occurred');
    }
  }
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
                height: 225,
                width: 225,
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
              style={{ alignSelf: 'center', padding: 25 }}
              size="h3"
            >
              Login
            </Text>
            <Text>{val}</Text>
            <Text>Username</Text>
            <TextInput
              containerStyle={{ marginTop: 5, marginBottom: 10}}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
            <Text>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 5, marginBottom: 10}}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button text='Login'
              title="Login"
              onPress={handleLogin}
              style={{ marginTop: 20, backgroundColor: '#080705' }} // Change the background color here
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
                {/* Dark mode and Light mode option */}
            <View style={{ flexDirection: 'row', alignItems: 'left', justifyContent: 'left', marginTop: 0 }}>
              {/* <Text>Light Mode</Text> */}
              <Switch
                style={{ marginLeft: 0 }}
                value={isDarkmode}
                onValueChange={() => setTheme(isDarkmode ? 'light' : 'dark')}
              />
              {/* <Text>Dark Mode</Text> */}
              </View>
            
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}

