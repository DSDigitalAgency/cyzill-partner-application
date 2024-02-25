import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import OauthLogin from './OauthLogin';
import { Color } from '../../../assets/themes/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BASE_URL from '../../../config';

const SignUp = ({ navigation }) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    error: null,
    passwordErrors: {
      length: true,
      lowercase: true,
      uppercase: true,
      number: true,
      specialChar: true,
    },
    showPasswordSuggestions: false,
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      phoneNumber: '',
      password: '',
      passwordErrors: {
        length: true,
        lowercase: true,
        uppercase: true,
        number: true,
        specialChar: true,
      },
      phoneNumberError: false,
      passwordsMatch: true,
    }));
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: state.username,
          email: state.email,
          phoneNumber: state.phoneNumber,
          password: state.password,
          termsAccepted: state.termsAccepted ? 'ok' : '',
        }),
      });
  
      if (response.ok) {
        setState((prevState) => ({ ...prevState, error: 'User created successfully!' }));
        // Assuming you have a 'Profile' screen, you can navigate to it
        navigation.navigate('Profile');
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        setState((prevState) => ({ ...prevState, error: errorData.message || 'Registration failed.' }));
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setState((prevState) => ({ ...prevState, error: 'An unexpected error occurred. Please try again.' }));
    }
  };
 
  const loginpressed = () => {
    navigation.navigate('Login');
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setState(prevState => ({
      ...prevState,
      confirmPassword,
      passwordsMatch: confirmPassword === prevState.password,
    }));
  };

  const handlePasswordChange = (password) => {
    setState(prevState => ({
      ...prevState,
      password,
      passwordErrors: {
        length: !validateLength(password),
        lowercase: !validateLowercase(password),
        uppercase: !validateUppercase(password),
        number: !validateNumber(password),
        specialChar: !validateSpecialChar(password),
      },
      showPasswordSuggestions: true,
      passwordSuggestions: generatePasswordSuggestions(password),
    }));
  };

  const validateLength = (password) => password.length >= 8;
  const validateLowercase = (password) => /[a-z]/.test(password);
  const validateUppercase = (password) => /[A-Z]/.test(password);
  const validateNumber = (password) => /\d/.test(password);
  const validateSpecialChar = (password) => /[^A-Za-z0-9]/.test(password);

  const handlePhoneNumberChange = (phoneNumber) => {
    if (phoneNumber.trim() !== '') {
      setState(prevState => ({
        ...prevState,
        phoneNumber: phoneNumber,
        phoneNumberError: !validatePhoneNumber(phoneNumber),
      }));
    } else {
      console.error('Phone number cannot be null or empty');
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[6789]\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const generatePasswordSuggestions = (password) => {
    const newSuggestions = [];

    if (!validateLength(password)) {
      newSuggestions.push('At least 8 characters');
    }
    if (!validateLowercase(password)) {
      newSuggestions.push('At least one lowercase letter');
    }
    if (!validateUppercase(password)) {
      newSuggestions.push('At least one uppercase letter');
    }
    if (!validateNumber(password)) {
      newSuggestions.push('At least one number');
    }
    if (!validateSpecialChar(password)) {
      newSuggestions.push('At least one special character');
    }

    return newSuggestions;
  };

  const { passwordsMatch, error, passwordErrors } = state;

  const termsandconditionspress = () => {
    console.log("Terms and Conditions Pressed");
  };

  const termsandconditionsTextSection = { // Add this const declaration
    flexDirection: 'row',
    alignItems: 'center',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Sign up</Text>

        <View style={styles.signupsection}>
          <Text style={styles.signuptext}>Already have an account?</Text>
          <TouchableOpacity onPress={loginpressed}>
            <View style={styles.signupLink}>
              <Text style={styles.signupLinkText}>Log In</Text>
            </View>
          </TouchableOpacity>
        </View>

        <OauthLogin />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={state.username}
            placeholder='Please enter name'
            placeholderTextColor={Color.lightgray}
            onChangeText={(text) => setState(prevState => ({ ...prevState, username: text.trim() }))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Please enter you phone number"
            placeholderTextColor={Color.lightgray}
            value={state.phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
          {state.phoneNumberError && <Text style={styles.phoneNumberErrorText}>Invalid phone number</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder='Plase enter your email'
            placeholderTextColor={Color.lightgray}
            value={state.email}
            onChangeText={(text) => setState(prevState => ({ ...prevState, email: text.trim() }))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={state.password}
            placeholder='Please enter a stong password'
            placeholderTextColor={Color.lightgray}
            onChangeText={handlePasswordChange}
          />
          {state.showPasswordSuggestions && (
            <View>
              {state.passwordSuggestions.map((suggestion, index) => (
                <Text key={index} style={styles.passwordSuggestions}>{suggestion}</Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder='Plese enter the same password'
            placeholderTextColor={Color.lightgray}
            onChangeText={handleConfirmPasswordChange}
          />
          {!passwordsMatch && <Text style={styles.passwordSuggestions}>Passwords do not match</Text>}
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={styles.termsandconditionsField}>
          <TouchableOpacity onPress={() => setState(prevState => ({ ...prevState, termsAccepted: !state.termsAccepted }))}>
            <View style={styles.termsandconditions}>
              {state.termsAccepted && <Icon name="check-box" style={styles.termsicons} />}
              {!state.termsAccepted && <Icon name="check-box-outline-blank" style={styles.termsicons} />}
              <View style={termsandconditionsTextSection}>
                <Text style={styles.termsandconditionsText}>Clicking this, you agree to our </Text>
                <View style={styles.termsandconditionslinksection}>
                  <TouchableOpacity onPress={termsandconditionspress}>
                    <Text style={styles.termsandconditionsLinkText}>terms and conditions.</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>


        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSubmit}
        >
          <Text style={styles.signupButtonText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  termsandconditionsTextSection: { 
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Color.bgcolor,
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.white,
  },
  signupsection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  signuptext: {
    color: Color.white,
  },
  signupLink: {
    marginLeft: 5, 
  },
  signupLinkText: {
    color: Color.lightblue, 
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: Color.white,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: Color.lightgray,
  },
  phoneNumberErrorText: {
    color: 'red',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  dividerText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  passwordSuggestions: {
    color: (suggestion) => (passwordErrors[suggestion] ? 'green' : 'red'),
  },
  errorContainer: {
    backgroundColor: '#FFC0CB',
    border: '1px solid #DC143C',
    padding: 10,
    marginBottom: 20,
  },
  errorText: {
    color: '#DC143C',
  },
  signupButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  termsandconditionsField: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsicons: {
    fontSize: 24,
    color: Color.lightblue,
  },
  termsandconditions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  termsandconditionsText: {
    marginLeft: 5,
    color: Color.white,
  },
  termsandconditionsLinkText: {
    color: Color.lightblue,
  }, 
});

export default SignUp;
