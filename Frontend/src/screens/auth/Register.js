import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image } from "react-native";
import { Layout, Text, TextInput, Button, useTheme, themeColor } from "react-native-rapi-ui";
import axios from 'axios'; // Import Axios for making HTTP requests

export default function RegisterScreen({navigation}) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = () => {
    // Validation checks
    if (!email || !name || !lastName || !username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Make an HTTP POST request to the registration endpoint of your Django backend
    axios.post('http://localhost:8000/register/', {
      email: email,
      name: name,
      lastName: lastName,
      username: username,
      password: password
    })
    .then(response => {
      console.log("Registration successful:", response.data);
      // Add navigation or any other logic upon successful registration
      navigation.navigate("Login");
    })
    .catch(error => {
      console.error("Registration failed:", error);
      // Handle registration failure, e.g., display an error message
    });
  };

  return (
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
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../../assets/Images/register.png")}
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
              size="h3"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Register
            </Text>
            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 10 }}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text>Name</Text>
            <TextInput
              containerStyle={{ marginTop: 10 }}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text>Last Name</Text>
            <TextInput
              containerStyle={{ marginTop: 10 }}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <Text>Username</Text>
            <TextInput
              containerStyle={{ marginTop: 10 }}
              placeholder="Enter your username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <Text>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 10 }}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <Text>Confirm Password</Text>
            <TextInput
              containerStyle={{ marginTop: 10 }}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
            />
            <Button
              text={loading ? "Loading" : "Create an account"}
              onPress={register} // Call the register function when the button is pressed
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity  onPress={() => {
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
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
