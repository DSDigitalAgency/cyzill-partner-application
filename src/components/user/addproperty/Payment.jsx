import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../../config';

const Payment = ({ formData, saveFormData }) => {
  const { currentUser } = useSelector(state => state.user);
  const username = currentUser?.username;
  const photo = currentUser?.photo;
  const phoneNumber = currentUser?.phoneNumber;
  const [price, setPrice] = useState(formData.price || '');
  const [advanceDeposit, setAdvanceDeposit] = useState(formData.advanceDeposit || '');
  const [maintenanceCharges, setMaintenanceCharges] = useState(formData.maintenanceCharges || '');
  const [excludeStampDuty, setExcludeStampDuty] = useState(formData.excludeStampDuty || false);
  const [priceIncludes, setPriceIncludes] = useState(formData.priceIncludes || '');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/api/property/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, username, photo, phoneNumber }),
      });

      if (response.ok) {
        console.log('Data saved successfully');
        setStatus('Saved Successfully');
        navigation.navigate('Checkout', { formData });
      } else {
        console.error('Error saving data');
        setStatus('Error saving data');
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (value, setter, fieldName) => {
    setter(value);
    saveFormData({ ...formData, [fieldName]: value });
  };

  const handlePriceIncludesChange = (value) => {
    setPriceIncludes(value);
    saveFormData({ ...formData, priceIncludes: value });
  };

  const handleCheckboxChange = () => {
    setExcludeStampDuty(!excludeStampDuty);
    saveFormData({ ...formData, excludeStampDuty: !excludeStampDuty });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Payment Details</Text>
        <View>
          <Text>Price in INR(₹)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={price}
            onChangeText={(value) => handleInputChange(value, setPrice, 'price')}
          />
        </View>
        <View>
          <Text>Advance Deposit</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={advanceDeposit}
            onChangeText={(value) => handleInputChange(value, setAdvanceDeposit, 'advanceDeposit')}
          />
        </View>
        <View>
          <Text>Price Includes:</Text>
          <TextInput
            style={styles.input}
            value={priceIncludes}
            onChangeText={(value) => handlePriceIncludesChange(value)}
          />
        </View>
        <View>
          <Text>Maintenance Charges per Month</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={maintenanceCharges}
            onChangeText={(value) => handleInputChange(value, setMaintenanceCharges, 'maintenanceCharges')}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Switch value={excludeStampDuty} onValueChange={handleCheckboxChange} />
          <Text style={styles.checkboxLabel}>Exclude Stamp Duty and Registration Charges</Text>
        </View>
        <Text>{status}</Text>
        <Button
          title={submitting ? 'Submitting...' : 'Submit'}
          onPress={handleSubmit}
          disabled={submitting}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    marginTop: 10,
  },
});

export default Payment;
