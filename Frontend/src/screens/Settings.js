import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const settingsOptions = [
    { id: '2', title: 'FAQ', icon: 'help-circle' },
    { id: '3', title: 'Change Password', icon: 'key' },
    { id: '4', title: 'Logout', icon: 'log-out' },
  ];

  const renderSettingItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSettingPress(item)}
      style={styles.settingItem}
    >
      <Ionicons name={item.icon} size={24} color="black" style={styles.icon} />
      <Text style={styles.settingTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleSettingPress = (item) => {
    switch (item.id) {
      case '2':
        navigation.navigate('FAQScreen');
        break;
      case '3':
        navigation.navigate('ChangePasswordScreen');
        break;
      case '4':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://10.0.2.2:8000/logout/');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  list: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
  },
  icon: {
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 18,
  },
});

export default SettingsScreen;
