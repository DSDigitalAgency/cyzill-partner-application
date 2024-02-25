import React, { useEffect, useState } from 'react';
import { Share, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserProfile } from '../actions/userActions';
import { Color } from '../../../assets/themes/theme';
import BASE_URL from '../../../config';
import PropertyCard from '../common/PropertyCard'; 

const ListedProperties = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username || ''); // Update this line
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch user profile when the component mounts
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    // Update local state when currentUser changes
    if (currentUser && currentUser.others) {
      setUsername(currentUser.username || ''); // Update this line
    }
  }, [currentUser]);

  console.log({username});

  useEffect(() => {
    // Fetch properties only when the username is available
    if (username) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.cyzill.com/api/property/properties/user/${username}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log('Fetched properties:', data); 
          setProperties(data);
        } catch (error) {
          console.error('Error fetching properties:', error.message);
        }
      };

      fetchData();
    }
  }, [username]);

  const handleEdit = (propertyId) => {
    // Implement the property deletion logic
    console.log(`Edit property: ${propertyId}`);
  };

  const handleDelete = (propertyId) => {
    // Display a confirmation dialog
    Alert.alert(
      'Confirm Deletion',
      'Do you want to delete this property?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteProperty(propertyId),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteProperty = async (propertyId) => {
    try {
      console.log(`Deleting property: ${propertyId}`);

      const response = await fetch(`${BASE_URL}/api/property/properties/${propertyId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Optionally, you can update the local state after successful deletion
        setProperties(prevProperties => prevProperties.filter(prop => prop._id !== propertyId));
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting property:', error.message);
    }
  };

  const handleShare = (property) => {
    // Implement the property sharing logic
    const message = `Check out this property at ${property.location.address}. It's listed for ₹.${property.price}.`;
    const propertyLink = `${BASE_URL}/api/property/properties/${property._id}`; // Replace with your actual deep link or URL

    Share.share({
      message: `${message}\n\n${propertyLink}`,
      title: 'Property Details',
      url: propertyLink,
    })
      .catch(error => console.error('Error sharing property:', error));
  };

  return (
    <ScrollView style={styles.container}>
      {/* ... (other JSX) */}
      {properties.length === 0 ? (
        <View style={styles.noPropertyContainer}>
          <Text style={styles.noPropertyText}>No properties found.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddProperty')}
            style={styles.addPropertyButton}
          >
            <Text style={styles.addPropertyButtonText}>Add Property</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.propertyList}>
          {properties.map(property => (
            <PropertyCard
              key={property._id}
              property={property}
              navigation={navigation}
              customStyles={styles.propertyContainer}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bgcolor,
  },
  topsection: {
    backgroundColor: Color.black,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 65,
    padding: 10,
  },
  backicon: {
    fontSize: 24,
    color: Color.white,
    marginRight: 'auto',
  },
  title: {
    flex: 1, 
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.white,
    textAlign: 'center',
  },
  propertyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
  },
  propertyContainer: {
    width: '95%',
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
  },
  propertyText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonsContainer: {
    position: 'center',
    marginTop: 5,
    flexDirection: 'row',
  },
  button: {
    marginRight: 10,
    borderColor: "#3498db",
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  noPropertyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 65,
  },
  noPropertyText: {
    fontSize: 18,
    marginBottom: 20,
    color: Color.white,
  },
  addPropertyButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addPropertyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListedProperties;
