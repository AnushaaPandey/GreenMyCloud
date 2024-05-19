import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image } from 'react-native';
// import axios from 'axios';
import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';

// import { useNavigation } from "@react-navigation/native";
// import { AuthContext } from "./src/provider/AuthProvider";

export default function ForgotPasswordScreen({navigation}) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  // const navigation = useNavigation();
 
  const forget = async () => {
    setLoading(true);
    try {
      // Simulate sending password reset email
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async call
      setLoading(false);
      navigation.navigate('Login');
      alert('Your password reset link has been sent to your email');
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    // <NavigationContainer> {/* Wrap your component with NavigationContainer */}
      <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
        <Layout>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
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
                source={require('../../../assets/Images/forget.png')}
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
                size="h3"
                fontWeight="bold"
                style={{
                  alignSelf: 'center',
                  padding: 30,
                }}
              >
                Forgot Password
              </Text>
              <Text>Email</Text>
              <TextInput
                containerStyle={{ marginTop: 15 }}
                placeholder="Enter your email"
                value={email}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
              />
              <Button
                text={loading ? 'Loading' : 'Send email'}
                onPress={forget}
                style={{
                  marginTop: 20,
                }}
                disabled={loading}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                  justifyContent: 'center',
                }}
              >
                <Text size="md">Remembered your password?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                >
                  <Text
                    size="md"
                    fontWeight="bold"
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    Login here
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 30,
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    isDarkmode ? setTheme('light') : setTheme('dark');
                  }}
                >
                  <Text
                    size="md"
                    fontWeight="bold"
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    {isDarkmode ? '☀️ light theme' : '🌑 dark theme'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Layout>
      </KeyboardAvoidingView>
    // </NavigationContainer>
  );
}
