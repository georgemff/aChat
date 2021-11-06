import React, {useContext, useState} from 'react';

import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

import {Context} from '../context/AuthContext';

const LoginScreen = () => {
const [nickname, setNickname] = useState("") 
const [password, setPassword] = useState("") 
const {signIn} = useContext(Context);
  

  const auth = () => {
    console.log(nickname, password)
    signIn({nickname, password})
  }
  return (
    <View style={styles.container}>
      <View style={styles.loginHeader}>
        <Text style={styles.headerText}>Login or Register</Text>
      </View>
      <View style={styles.loginForm}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#FFFFFF"
          placeholder="NickName"
          onChangeText={value => setNickname(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
        />
        <Button
          onPress={auth}
          title="Login"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#1E1E1E"
  },

  loginHeader: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },

  headerText: {
    fontSize: 20,
    textAlign: 'center',
    color: "#FFFFFF"
  },

  loginForm: {
    flex: 3,
    paddingHorizontal: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#FFFFFF"
  },
});

export default LoginScreen;
