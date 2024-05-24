import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Alert, Switch } from 'react-native';
import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';

export default function LoginScreen({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        navigation.navigate('Dashboard');
      } else {
        console.error('Login failed:', data);
        Alert.alert('Login failed', 'An unexpected error occurred');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login failed', 'An unexpected error occurred');
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
            {/* Displaying user state for debugging, remove in production */}
            {/* {<Text>Logged in as: {username}</Text>} */}
            <Text>Username</Text>
            <TextInput
              containerStyle={{ marginTop: 5, marginBottom: 10 }}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
            <Text>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 5, marginBottom: 10 }}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              text='Login'
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
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
