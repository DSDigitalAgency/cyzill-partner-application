import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Picker, ScrollView, StyleSheet } from 'react-native';

const Description = ({ formData, saveFormData }) => {
  const [description, setDescription] = useState(formData?.description || 'Default description');
  const [personalDetails, setPersonalDetails] = useState(formData?.personalDetails || '');
  const [forDetails, setForDetails] = useState(formData?.forDetails || '');
  const [propertyType, setPropertyType] = useState(formData?.propertyType || '');
  const [totalFlats, setTotalFlats] = useState(formData?.totalFlats || '');
  const [warning, setWarning] = useState('');
  const maxDescriptionLength = 1000;

  const handleDescriptionChange = (text) => {
    const hasFiveDigits = /\d{5}/.test(text);
    if (hasFiveDigits) {
      setWarning('*Please do not include any phone numbers or personal information in the description.');
    } else if (text.length <= maxDescriptionLength) {
      setDescription(text);
      if (saveFormData) {
        saveFormData({ ...formData, description: text });
      }
      setWarning('');
    }
  };

  useEffect(() => {
    if (propertyType !== 'flat') {
      setTotalFlats('');
    }
  }, [propertyType]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Description</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Property Listed By</Text>
          <Picker
            selectedValue={personalDetails}
            onValueChange={(value) => {
              setPersonalDetails(value);
              if (saveFormData) {
                saveFormData({ ...formData, personalDetails: value });
              }
            }}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Owner" value="owner" />
            <Picker.Item label="Agent" value="agent" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Property Listing Type</Text>
          <Picker
            selectedValue={forDetails}
            onValueChange={(value) => {
              setForDetails(value);
              if (saveFormData) {
                saveFormData({ ...formData, forDetails: value });
              }
            }}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Sell" value="sell" />
            <Picker.Item label="Rent" value="rent" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type of Property</Text>
          <Picker
            selectedValue={propertyType}
            onValueChange={(value) => {
              setPropertyType(value);
              if (saveFormData) {
                saveFormData({ ...formData, propertyType: value });
              }
            }}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Flat/Apartment" value="flat" />
            <Picker.Item label="Residential House" value="residentailhouse" />
            {/* Add other options */}
          </Picker>
        </View>

        {propertyType === 'flat' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Total Number of Flats</Text>
            <Picker
              selectedValue={totalFlats}
              onValueChange={(value) => {
                setTotalFlats(value);
                if (saveFormData) {
                  saveFormData({ ...formData, totalFlats: value });
                }
              }}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="Below 50" value="below50" />
              <Picker.Item label="Between 50 and 100" value="between50and100" />
              <Picker.Item label="Above 100" value="above100" />
            </Picker>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>What makes this place special?</Text>
          <TextInput
            value={description}
            onChangeText={handleDescriptionChange}
            multiline
            placeholder="Enter description about the property (max 1000 words)"
            style={styles.textInput}
          />
          <Text style={styles.characterCount}>{description.length}/{maxDescriptionLength}</Text>
          {warning && <Text style={styles.warning}>{warning}</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  characterCount: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  warning: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});

export default Description;
