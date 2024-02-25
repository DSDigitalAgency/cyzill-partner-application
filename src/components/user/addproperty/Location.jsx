import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import LocationDetails from './LocationDetails';

const Location = ({ formData, saveFormData }) => {
  const [mapPosition, setMapPosition] = useState({
    latitude: formData.location?.lat || 17.406498,
    longitude: formData.location?.lng || 78.47724389999999,
  });

  const [selectedPlace, setSelectedPlace] = useState(mapPosition);
  const [address, setAddress] = useState('');

  const markerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Fetch address based on new position (similar to your existing logic)
    // ...

    // Update form data
    saveFormData({
      ...formData,
      location: {
        ...formData.location,
        lat: selectedPlace.latitude,
        lng: selectedPlace.longitude,
        address: address,
        // ... other location details
      },
    });
  }, [selectedPlace]);

  const handleLatitudeChange = (text) => {
    const newLat = parseFloat(text);
    setMapPosition({ ...mapPosition, latitude: newLat });
    setSelectedPlace({ ...selectedPlace, latitude: newLat });
  };

  const handleLongitudeChange = (text) => {
    const newLng = parseFloat(text);
    setMapPosition({ ...mapPosition, longitude: newLng });
    setSelectedPlace({ ...selectedPlace, longitude: newLng });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Location Details</Text>
      {/* ... Other components, like search box, etc. */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: mapPosition.latitude,
            longitude: mapPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={(region) => {
            setSelectedPlace({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          ref={(ref) => (mapRef.current = ref)}
        >
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            ref={markerRef}
            title="Selected Location"
          />
        </MapView>
      </View>
      <LocationDetails
        selectedPlace={selectedPlace}
        handleLatitudeChange={handleLatitudeChange}
        handleLongitudeChange={handleLongitudeChange}
        address={address}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mapContainer: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  map: {
    flex: 1,
  },
});

export default Location;
