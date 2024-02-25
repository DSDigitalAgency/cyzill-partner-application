import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignUp from '../components/auth/SignUp';

const SignUpScreen = ({ navigation }) => {
  return (
    <SignUp navigation={navigation} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
