import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import ProfileScreen from './ProfileScreen';
// import FAQScreen from './FAQScreen';
// import PasswordChangeScreen from './PasswordChangeScreen';

// const Tab = createMaterialTopTabNavigator();

const Setting = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="FAQ" component={FAQScreen} />
      <Tab.Screen name="Password Change" component={PasswordChangeScreen} />
    </Tab.Navigator>
  );
};

export default Setting;
 