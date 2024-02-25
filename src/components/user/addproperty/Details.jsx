import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Picker, CheckBox, ScrollView, StyleSheet } from 'react-native';

const Details = ({ formData, saveFormData }) => {
  const [bedrooms, setBedrooms] = useState(formData.bedrooms || '');
  const [bathrooms, setBathrooms] = useState(formData.bathrooms || '');
  const [coveredArea, setCoveredArea] = useState(formData.coveredArea || '');
  const [carpetArea, setCarpetArea] = useState(formData.carpetArea || '');
  const [constructionYear, setConstructionYear] = useState(formData.constructionYear || '');
  const [totalFloors, setTotalFloors] = useState(formData.totalFloors || '');
  const [floorNumber, setFloorNumber] = useState(formData.floorNumber || '');
  const [furnishedStatus, setFurnishedStatus] = useState(formData.furnishedStatus || '');
  const [amenities, setAmenities] = useState(formData.amenities || []);

  useEffect(() => {
    setBedrooms(formData.bedrooms || '');
    setBathrooms(formData.bathrooms || '');
    setCoveredArea(formData.coveredArea || '');
    setCarpetArea(formData.carpetArea || '');
    setConstructionYear(formData.constructionYear || '');
    setTotalFloors(formData.totalFloors || '');
    setFurnishedStatus(formData.furnishedStatus || '');
    setAmenities(formData.amenities || []);
  }, [formData]);

  const handleFurnishedStatusChange = (value) => {
    setFurnishedStatus(value);
    saveFormData({ ...formData, furnishedStatus: value });
  };

  const handleAmenityChange = (amenity, checked) => {
    const newAmenities = checked ? [...amenities, amenity] : amenities.filter((a) => a !== amenity);
    setAmenities(newAmenities);
    saveFormData({ ...formData, amenities: newAmenities });
  };

  const handleTotalFloorsChange = (value) => {
    setTotalFloors(value);
    saveFormData({ ...formData, totalFloors: value });
  };

  const handleFloorNumberChange = (value) => {
    setFloorNumber(value);
    saveFormData({ ...formData, floorNumber: value });
  };

  const handleBedroomsChange = (value) => {
    setBedrooms(value);
    saveFormData({ ...formData, bedrooms: value });
  };

  const handleBathroomsChange = (value) => {
    setBathrooms(value);
    saveFormData({ ...formData, bathrooms: value });
  };

  const handleCoveredAreaChange = (value) => {
    setCoveredArea(value);
    saveFormData({ ...formData, coveredArea: value });
  };

  const handleCarpetAreaChange = (value) => {
    setCarpetArea(value);
    saveFormData({ ...formData, carpetArea: value });
  };

  const handleConstructionYearChange = (value) => {
    setConstructionYear(value);
    saveFormData({ ...formData, constructionYear: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Property Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bedrooms</Text>
          <TextInput
            keyboardType="numeric"
            value={bedrooms}
            onChangeText={handleBedroomsChange}
            style={styles.textInput}
            placeholder="Enter number of bedrooms"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bathrooms</Text>
          <TextInput
            keyboardType="numeric"
            value={bathrooms}
            onChangeText={handleBathroomsChange}
            style={styles.textInput}
            placeholder="Enter number of bathrooms"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Total Floors</Text>
          <TextInput
            keyboardType="numeric"
            value={totalFloors}
            onChangeText={handleTotalFloorsChange}
            style={styles.textInput}
            placeholder="Enter total number of floors"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Floor Number</Text>
          <TextInput
            keyboardType="numeric"
            value={floorNumber}
            onChangeText={handleFloorNumberChange}
            style={styles.textInput}
            placeholder="Enter floor number"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Furnished Status</Text>
          <Picker
            selectedValue={furnishedStatus}
            onValueChange={(value) => handleFurnishedStatusChange(value)}
            style={styles.picker}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Furnished" value="Furnished" />
            <Picker.Item label="Semi-Furnished" value="Semi-Furnished" />
            <Picker.Item label="Unfurnished" value="Unfurnished" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Covered Area (Sq.Ft)</Text>
          <TextInput
            keyboardType="numeric"
            value={coveredArea}
            onChangeText={handleCoveredAreaChange}
            style={styles.textInput}
            placeholder="Enter covered area"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Carpet Area (Sq.Ft)</Text>
          <TextInput
            keyboardType="numeric"
            value={carpetArea}
            onChangeText={handleCarpetAreaChange}
            style={styles.textInput}
            placeholder="Enter carpet area"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Year of Construction</Text>
          <TextInput
            keyboardType="numeric"
            value={constructionYear}
            onChangeText={handleConstructionYearChange}
            style={styles.textInput}
            placeholder="Enter construction year"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amenities</Text>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={amenities.includes('Water')}
              onValueChange={(checked) => handleAmenityChange('Water', checked)}
            />
            <Text style={styles.checkboxLabel}>Water</Text>
            {/* Add other checkboxes for amenities */}
          </View>
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
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
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
});

export default Details;
