import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {View, Button} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import {Context} from '../context/AuthContext';
import {connect} from 'react-redux';
import ChatScreen from '../screens/ChatStreen';
const Stack = createNativeStackNavigator();

const HomeNavigation = (props: any) => {
  const {signOut} = useContext(Context);

  const HomeHeaderOptions = () => ({
    headerStyle: {
      backgroundColor: '#1E1E1E',
    },
    headerTintColor: '#FFFFFF',
    title: 'aChat',
    headerRight: () => (
      <Button
        title="logout"
        onPress={() => {
          signOut();
        }}
      />
    ),
  });
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={HomeHeaderOptions()}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Chat"
        options={{
          headerStyle: {
            backgroundColor: '#1E1E1E',
          },
          headerTintColor: '#FFFFFF',
        }}
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    target: state.targetId,
  };
};
export default connect(mapStateToProps)(HomeNavigation);
