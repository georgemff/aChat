import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};


export default LoginNavigation;