import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const LocationDetails = ({ address }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Address:</Text>
      <TextInput
        value={address}
        editable={false}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
});

export default LocationDetails;
