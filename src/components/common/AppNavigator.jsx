import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import ListedPropertiesScreen from '../../screens/ListedPropertiesScreen';
import AddPropertyFormScreen from '../../screens/AddPropertyScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import TermsofServicesScreen from '../../screens/TermsofServicesScreen';
import PrivacyPolicyScreen from '../../screens/PrivacyPolicyScreen';
import AboutUsScreen from '../../screens/AboutUsScreen';
import FaqScreen from '../../screens/FqaScreen';
import FairUseScreen from '../../screens/FairUseScreen';
import ContactUsScreen from '../../screens/ContactUsScreen';
import PropertyDetailsScreen from '../../screens/PropertyDetailsScreen';

import { Color } from '../../../assets/themes/theme';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{
      headerStyle: {
        backgroundColor: Color.cbgcolor,
      },
      headerTintColor: Color.white, 
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ListedProperties" component={ListedPropertiesScreen} />
      <Stack.Screen name="AddProperty" component={AddPropertyFormScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Terms of Services" component={TermsofServicesScreen} />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="About Us" component={AboutUsScreen} />
      <Stack.Screen name="FAQ's" component={FaqScreen} />
      <Stack.Screen name="Fair Use" component={FairUseScreen} />
      <Stack.Screen name="Contact Us" component={ContactUsScreen} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
