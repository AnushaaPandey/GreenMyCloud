import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Alert, Switch } from "react-native";
import { Layout, Text, TextInput, Button, useTheme, themeColor } from "react-native-rapi-ui";
import axios from 'axios'; // Import Axios for making HTTP requests

export default function RegisterScreen({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!email || !name || !lastName || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', {
        email: email,
        name: name,
        last_name: lastName, // Adjust the key name to match your backend serializer
        username: username,
        password: password
      });
      console.log("Registration successful:", response.data);
      Alert.alert("Success", "Registration successful. Please log in.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
      Alert.alert("Error", error.response ? error.response.data.msg : "An unexpected error occurred");
    } finally {
      setLoading(false);
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
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 225, width: 225 }}
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
              style={{ alignSelf: "center", padding: 30 }}
            >
              Register
            </Text>
            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginBottom: 5, marginTop: 5 }}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text>Name</Text>
            <TextInput
              containerStyle={{ marginBottom: 5, marginTop: 5 }}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text>Last Name</Text>
            <TextInput
              containerStyle={{ marginBottom: 5, marginTop: 5 }}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <Text>Username</Text>
            <TextInput
              containerStyle={{ marginBottom: 5, marginTop: 5 }}
              placeholder="Enter your username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <Text>Password</Text>
            <TextInput
              containerStyle={{ marginBottom: 5, marginTop: 5 }}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <Text>Confirm Password</Text>
            <TextInput
              containerStyle={{ marginBottom: 5, marginTop: 5 }}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
            />
            <Button
              text={loading ? "Loading..." : "Create an account"}
              onPress={register}
              style={{
                marginTop: 15,
                marginBottom: 10,
                backgroundColor: '#EDF6F9',
                borderRadius: 8,
              }}
              disabled={loading}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
                marginBottom: 10,
                justifyContent: "center",
              }}
            >
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{ marginLeft: 5 }}
                >
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
