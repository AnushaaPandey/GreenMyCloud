import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Alert, Switch } from 'react-native';
import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/login/', {
        username: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.headers['content-type'].includes('application/json')) {
        const data = response.data;
        if (response.status === 200) {
          navigation.navigate('Dashboard');
        } else {
          Alert.alert('Login failed', data.message || 'An unexpected error occurred');
        }
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        Alert.alert('Login failed', error.response.data.errors.non_field_errors[0]);
      } else {
        Alert.alert('Login failed', 'An unexpected error occurred');
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 0 }}>
            <Switch
              style={{ marginLeft: 0 }}
              value={isDarkmode}
              onValueChange={() => setTheme(isDarkmode ? 'light' : 'dark')}
            />
          </View>
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
              style={{ height: 225, width: 225 }}
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
            <Text>Username</Text>
            <TextInput
              containerStyle={{ marginTop: 5, marginBottom: 10, paddingHorizontal:20 }}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
            <Text>Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                containerStyle={{ flex: 1 }}
                placeholder={showPassword ? "Enter your password" : "Enter your password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)} // Toggle showPassword state
                style={{ padding: 10 }}
              >
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={15} color="black" />
              </TouchableOpacity>
            </View>
            <Button
              text="Login"
              onPress={handleLogin}
              style={{ marginTop: 20, backgroundColor: '#007bff' }}
            />
            <TouchableOpacity
              onPress={() => {
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
