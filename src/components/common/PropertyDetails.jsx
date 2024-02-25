import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Geocoding from 'react-native-geocoding';

import BASE_URL from '../../../config';
import logo from '../../../assets/images/logo.png';
import { Color } from '../../../assets/themes/theme';

const PropertyDetails = ({ route, customStyles }) => {
  const navigation = useNavigation();
  const [propertyDetails, setPropertyDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderWidth = Dimensions.get('window').width;

  Geocoding.init('YOUR_GOOGLE_MAPS_API_KEY');

  const [propertyCoordinates, setPropertyCoordinates] = useState(null);

  useEffect(() => {
    // Check if route or route.params is undefined
    if (!route || !route.params) {
      console.error('Route or route.params is undefined.');
      setError('Invalid route params');
      setLoading(false);
      return;
    }

    const { propertyId } = route.params;

    // Fetch property details from your API using the property ID
    fetchPropertyDetails(propertyId);
  }, [route]);

  const fetchPropertyDetails = async (propertyId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/property/properties/${propertyId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      // Set the property details state
      setPropertyDetails(data);
  
      // Extract coordinates from the location object
      const { lat, lng, address } = data.location;
  
      // Set the property coordinates state
      setPropertyCoordinates({ latitude: lat, longitude: lng });
  
      // Fetch coordinates based on the property address if needed
      // const coordinates = await Geocoding.from(address);
      // const { lat, lng } = coordinates.results[0].geometry.location;
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching property details:', error);
      setError('Error fetching property details');
      setLoading(false);
    }
  };

  const dateObject = new Date(propertyDetails.updatedAt);
  const formattedDate = dateObject.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

  const BackPressed = () => {
    navigation.goBack();
  };
  const sharePressed = () => {
    console.log("Share Pressed");
  };
  const contactpressed = () => {
    console.log("Contact Pressed");
  };

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const editbtnpressed = () => {
    console.log("Edit Pressed");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollcontainer}>
        <View style={styles.topbuttons}>
          <View style={styles.indexContainer}>
            <Text style={styles.indexText}>{`${currentIndex + 1}/${propertyDetails.photos ? propertyDetails.photos.length : 0}`}</Text>
            {/* <Text style={styles.indexText}>{`${currentIndex + 1}/${propertyDetails.photos.length}`}</Text> */}
          </View>
        </View>
        <View style={styles.imagescontainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.imagesholder}>
              {propertyDetails.photos && propertyDetails.photos.length > 0 ? (
                <Swiper showsPagination={false} loop={false} onIndexChanged={handleIndexChanged}>
                  {propertyDetails.photos.map((item, index) => (
                    <Image key={index} source={{ uri: item }} style={styles.imageslider} />
                  ))}
                </Swiper>
              ) : (
                <Text>No photos available</Text>
              )}
            </View>
          )}
        </View>
        <View style={styles.propertydetailscontainer}>
          <View style={styles.propertytopsection}>
            <View style={styles.propertyintro}>
              <Icon name='bed' style={styles.propertyintroicons} />
              <Text style={styles.perpertytext}>{` ${propertyDetails.bedrooms} Bedrooms   `}</Text>
              <Icon name='home' style={styles.propertyintroicons} />
              <Text style={styles.perpertytext}>{` ${propertyDetails.coveredArea} sqft`}</Text>
            </View>
            <View style={styles.propertylocation}>
              <Icon name='map-marker' style={styles.propertyintroicons} />
              <Text style={styles.perpertytext}>{propertyDetails.location ? propertyDetails.location.address : 'Location not available'}</Text>
            </View>
            <View style={styles.usersection}>
              <View style={styles.userimagesection}>
              <Image source={{ uri: propertyDetails.photo }} style={styles.userimage} />
              </View>
              <View style={styles.userdetails}>
                <Text style={styles.username}>{` ${propertyDetails.username} `}</Text>
                <Text style={styles.usertype}>{` ${propertyDetails.personalDetails} `}</Text>
              </View>
              <View style={styles.phonesection}>
                <TouchableOpacity onPress={contactpressed}>
                  <View style={styles.contactbuttondisplay}>
                    <Icon name='phone' size={24} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.propertydescriptioncontainer}>
          <View style={styles.propertydescriptionsection}>
            <View style={styles.propertydescriptionmainfeatures}>
              <Text style={styles.propertydescriptionmainfeaturestitle}>Main Features of Property :</Text>
              <Text style={styles.propertyinfo}>{`BedRooms: ${propertyDetails.bedrooms} rooms`}</Text>
              <Text style={styles.propertyinfo}>{`BathRooms: ${propertyDetails.bathrooms} bathrooms`}</Text>
              <Text style={styles.propertyinfo}>{`Covered Area: ${propertyDetails.coveredArea} sqft`}</Text>
              <Text style={styles.propertyinfo}>{`Carpet Area: ${propertyDetails.carpetArea} sqft`}</Text>
              <Text style={styles.propertyinfo}>{`Furnished Status: ${propertyDetails.furnishedStatus}`}</Text>
            </View>
            <View style={styles.propertydescriptionsection}>
              <Text style={styles.propertydescriptiontitle}>Description :</Text>
              <Text style={styles.propertydescriptiontext}>{`${propertyDetails.description}`}</Text>
            </View>
          </View>
          <View style={styles.propertydescriptionmapsection}>
          <Text style={styles.propertydescriptionmainfeaturestitle}>Property location on maps :</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: propertyCoordinates.latitude,
                    longitude: propertyCoordinates.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: propertyCoordinates.latitude,
                      longitude: propertyCoordinates.longitude,
                    }}
                    title="Property Location"
                  />
                </MapView>
            )}
          </View>
          <View style={styles.propertyadditionalsection}>
            <View style={styles.propertyadditionalcontainer}>
              <Text style={styles.propertyadditionaltitle}>Additional Features :</Text>
              <View style={styles.amenitiesContainer}>
                <Text style={styles.propertyadditionalsubtitle}>Amenities :</Text>
                {propertyDetails.amenities && propertyDetails.amenities.length > 0 ? (
                  <View style={styles.amenitiesList}>
                    {propertyDetails.amenities.map((amenity, index) => (
                      <Text key={index} style={styles.amenityItem}>{amenity}</Text>
                    ))}
                  </View>
                ) : (
                  <Text>No amenities available</Text>
                )}
              </View>
              <View style={styles.otherscontainer}>
              <Text style={styles.propertyadditionalsubtitle}>Other Details :</Text>
              <Text style={styles.propertyinfo}>{`Construction Year: ${propertyDetails.constructionYear}`}</Text>
              <Text style={styles.propertyinfo}>{`Advance Deposit: ${propertyDetails.advanceDeposit}`}</Text>
              <Text style={styles.propertyinfo}>{`Price is: ${propertyDetails.priceIncludes}`}</Text>
              <Text style={styles.propertyinfo}>{`Updated on: ${formattedDate}`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.pricecontainer}>
        <View style={styles.pricedisplay}>
          <Text style={styles.priceText}>
            {propertyDetails.forDetails === 'rent'
              ? `Price: ₹${propertyDetails.price} / Month`
              : `Price: ₹${propertyDetails.price}`}
          </Text>
        </View>
        <TouchableOpacity onPress={contactpressed}>
          <View style={styles.contactbuttondisplay}>
            <Icon name='phone' size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
        </View>
      </ScrollView>
      <View style={styles.editsection}>
        <View style={styles.itemsection}>
          <TouchableOpacity onPress={editbtnpressed}>
            <Icon name='phone' size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.itemsection}>
          <TouchableOpacity onPress={editbtnpressed}>
            <Icon name='phone' size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bgcolor,
  },
  indexText: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    top: 240,
    right: 25,
    zIndex: 1,
  },
  imagescontainer: {
    marginBottom: -550, // Adjust this value as needed
  },
  imageslider: {
    width: '100%',
    height: 270,
  },
  propertydetailscontainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  
  propertytopsection: {
    marginBottom: 10,
  },
  
  propertyintro: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  propertyintroicons: {
    fontSize: 24,
    color: Color.white,
  },
  perpertytext: {
    marginLeft: 5,
    fontSize: 16,
    color: Color.white,
  },
  
  propertylocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  
  usersection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: Color.ccbgcolor,
    padding: 10,
    borderRadius: 10,
  },
  
  userimagesection: {
    marginRight: 10,
  },
  
  userimage: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  
  userdetails: {
    flexDirection: 'column',
    maxWidth: '70%',
  },
    
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
  },
  
  usertype: {
    fontSize: 14,
    color: Color.lightgray,
  },

  phonesection: {
    marginLeft: 'auto',
  },
  propertydescriptioncontainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.linecolor,
  },
  
  propertydescriptionsection: {
    marginBottom: 10,
    backgroundColor: Color.ccbgcolor,
    padding: 10,
    borderRadius: 10,
  },
  
  propertydescriptionmainfeatures: {
    marginBottom: 10,
  },
  
  propertydescriptionmainfeaturestitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Color.white,
  },
  
  propertyinfo: {
    fontSize: 16,
    color: Color.lightgray,
    marginBottom: 5,
  },
  
  propertydescriptiontitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Color.white,
  },
  
  propertydescriptiontext: {
    fontSize: 16,
    color: Color.lightgray,
    marginBottom: 10,
  },
  
  propertyadditionalsection: {
    marginBottom: 10,
  },
  
  propertyadditionalcontainer: {
    backgroundColor: Color.ccbgcolor,
    padding: 10,
    borderRadius: 8,
  },
  
  propertyadditionaltitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.white,
  },
  
  propertyadditionalsubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Color.white,
  },
  
  amenitiesContainer: {
    marginBottom: 10,
  },
  
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  amenityItem: {
    fontSize: 16,
    color: Color.lightgray,
    marginRight: 10,
    marginBottom: 5,
  },
  
  otherscontainer: {
    marginTop: 10,
  },
  
  
  pricecontainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Color.ccbgcolor,
    borderRadius: 10,
  },
  
  pricedisplay: {
    flex: 1,
  },
  
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.white,
  },
  
  contactbuttondisplay: {
    marginLeft: 10,
    backgroundColor: Color.lightblue,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 25,
  },

  map: {
    height: 200, 
    marginVertical: 10,
  },

  editsection: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Color.ccbgcolor,
    borderRadius: 10,
  },  
  
});

export default PropertyDetails;
