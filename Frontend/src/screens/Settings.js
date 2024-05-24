import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const settingsOptions = [
    { id: '1', title: 'User Profile' },
    { id: '2', title: 'FAQ' },
    { id: '3', title: 'Change Password' },
  ];

  const renderSettingItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSettingPress(item)}
      style={styles.settingItem}
    >
      <Text style={styles.settingTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleSettingPress = (item) => {
    switch (item.id) {
      case '1':
        // Navigate to user profile screen
        navigation.navigate('UserProfile');
        break;
      case '2':
        // Navigate to FAQ screen
        navigation.navigate('FAQ');
        break;
      case '3':
        // Navigate to change password screen
        navigation.navigate('ChangePassword');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  settingItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
  },
  settingTitle: {
    fontSize: 18,
  },
});

export default SettingsScreen;
