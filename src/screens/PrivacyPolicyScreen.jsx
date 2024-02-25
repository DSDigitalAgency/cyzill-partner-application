import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import logo from '../../assets/images/logo.png';
import { Color } from '../../assets/themes/theme';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={logo}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to Cyzill</Text>
        <Text style={styles.subtitle}>Privacy Policy</Text>
        <Text style={styles.description}>
          At Cyzill, we are dedicated to helping you find the perfect home.
          Whether you are buying, selling, or renting, our platform is designed to make
          the real estate process seamless and enjoyable.
        </Text>
        <Text style={styles.subtitle}>Our Mission</Text>
        <Text style={styles.description}>
          Our mission is to provide a comprehensive and user-friendly platform that connects
          buyers, sellers, and renters. We strive to deliver accurate and up-to-date property
          information, empowering users to make informed decisions.
        </Text>
        <Text style={styles.subtitle}>Why Choose Us?</Text>
        <Text style={styles.description}>
          - Extensive Property Listings: Explore a wide range of properties based on your preferences.
          {'\n'}- User-Friendly Interface: Our app is designed with simplicity and ease of use in mind.
          {'\n'}- Reliable Information: We ensure that property details are accurate and updated regularly.
          {'\n'}- Dedicated Support: Our team is here to assist you throughout your real estate journey.
        </Text>
        {/* Add more content as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Color.bgcolor,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Color.white,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: Color.white,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: Color.white,
  },
});

export default PrivacyPolicyScreen;
