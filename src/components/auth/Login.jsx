import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OauthLogin from './OauthLogin';
import logo from '../../../assets/images/logo.png';
import BASE_URL from '../../../config';
import { loginStart, loginSuccess, loginFailure } from '../redux/user/userSlice';
import { Color } from '../../../assets/themes/theme';

const Login = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigation.navigate('Home');
    }
  }, [currentUser, navigation]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!identifier || !password) {
      setError('Please provide both email/phone number and password.');
      return;
    }
  
    try {
      setLoading(true);
      dispatch(loginStart());
  
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });      
  
      const responseBody = await response.text();
      const data = responseBody ? JSON.parse(responseBody) : {};
  
      if (response.ok) {
        dispatch(loginSuccess(data));
        navigation.navigate('Home');
      } else {
        // Handle different failure scenarios
        if (response.status === 401) {
          setError('Invalid email/phone number or password. Please try again.');
        } else if (response.status === 404) {
          setError('User not found. Please sign up if you are a new user.');
        } else {
          setError(`Login failed: ${data.message || 'Unknown error'}`);
        }
        dispatch(loginFailure(data));
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again later.');
      dispatch(loginFailure({ message: 'Login failed. Please try again later.' }));
    } finally {
      setLoading(false);
    }
  };
  
  const signuppressed = () => {
    navigation.navigate('SignUp');
  };

  const resetpressed = () => {
    console.log('Reset is pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Log in to your account</Text>
        <View style={styles.signupsection}>
          <Text style={styles.signuptext}>Don't have an account?</Text>
          <TouchableOpacity onPress={signuppressed}>
            <View style={styles.signupLink}>
              <Text style={styles.signupLinkText}>Sign up</Text>
            </View>
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <OauthLogin />
        <View style={styles.divider}>
          <View style={styles.line}></View>
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.line}></View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your email or phone"
          placeholderTextColor={Color.lightgray}
          value={identifier}
          onChangeText={(text) => setIdentifier(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor={Color.lightgray}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Log In'}
          </Text>
        </TouchableOpacity>
        <View style={styles.signupsection}>
          <Text style={styles.signuptext}>Forgot Password?</Text>
          <TouchableOpacity onPress={resetpressed}>
            <View style={styles.signupLink}>
              <Text style={styles.signupLinkText}>Reset it here</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: Color.bgcolor,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,  
    height: 150, 
    resizeMode: 'contain', 
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: Color.cbgcolor,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
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
    textAlignVertical: 'center',
  },  
  error: {
    color: 'red',
    marginBottom: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Color.linecolor,
  },
  dividerText: {
    marginHorizontal: 10,
    color: Color.lightgray,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.lightgray,
    borderRadius: 5,
    padding: 10,
    color: Color.lightgray,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: Color.blue, 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: Color.white,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
  },
  loginActionText: {
    fontSize: 12,
  },
  forgotPasswordLink: {
    color: Color.lightblue,
    fontWeight: 'bold',
  },
  termsandconditions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  termsText: {
    marginLeft: 8,
  },
});

export default Login;
