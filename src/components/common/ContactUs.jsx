import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import { Color } from '../../../assets/themes/theme';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Add logic to submit form data or perform other actions
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentcontainer}>
        <View style={styles.containerbox}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder='Enter your Name'
              placeholderTextColor={Color.lightgray}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              placeholder='Enter your Email'
              placeholderTextColor={Color.lightgray}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Message:</Text>
            <TextInput
              style={[styles.input, { height: 'auto' }]}
              value={formData.message}
              onChangeText={(text) => handleInputChange('message', text)}
              multiline
              placeholder='Enter your Message'
              placeholderTextColor={Color.lightgray}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bgcolor,
  },
  contentcontainer: {
    padding: 5,
    marginTop: 30,
  },
  containerbox: {
    margin: 5,
    backgroundColor: Color.ccbgcolor,
    borderRadius: 10,
    padding: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Color.white,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: Color.linecolor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: Color.lightgray,
  },
  submitButton: {
    backgroundColor: Color.blue,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Color.white,
    fontSize: 16,
  },
});

export default ContactUs;
