import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Color } from '../../../assets/themes/theme';

const PropertyCard = ({ property, navigation, customStyles }) => {
  const cardPressed = () => {
    if (property._id) {
      navigation.navigate('PropertyDetails', { propertyId: property._id });
    } else {
      console.error('Property ID is undefined or null');
    }
  }; 

  const {
    photos = [],
    location = {},
    username,
    propertyType,
    forDetails,
    description,
    bedrooms,
    bathrooms,
    price,
  } = property;

  const first10WordsWithEllipsis = description.split(' ').slice(0, 7).join(' ') + '...';
  const first5WordsAddressWithEllipsis =
    location.address?.split(' ').slice(0, 5).join(' ') + '...';

  let renderedPrice;
  if (forDetails === 'sell') {
    renderedPrice = `₹ ${price}`;
  } else if (forDetails === 'rent') {
    renderedPrice = `₹ ${price} / month`;
  }

  return (
    <TouchableOpacity onPress={cardPressed} style={[styles.propertyCard, customStyles]}>
      <View style={styles.imageContainer}>
        {photos.length > 0 && (
          <Image
            source={{ uri: photos[0] }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={`Image for ${description}`}
          />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText} numberOfLines={2} ellipsizeMode="tail">
          {first10WordsWithEllipsis}
        </Text>
        <View style={styles.addressContainer}>
          <Icon name="map-marker" size={20} color="#333" />
          <Text style={styles.addressText}>{first5WordsAddressWithEllipsis}</Text>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconDetails}>
            <Icon name="bed" size={20} color="#333" />
            <Text> {bedrooms}</Text>
          </View>
          <View style={styles.iconDetails}>
            <Icon name="bath" size={20} color="#333" />
            <Text> {bathrooms}</Text>
          </View>
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>{username}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{renderedPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  propertyCard: {
    margin: 10,
    backgroundColor: Color.lightgray,
    borderRadius: 8,
    width: 350,
    height: 190,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    overflow: 'hidden',
    width: 65,
  },
  image: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  addressText: {
    fontSize: 10,
    color: Color.black,
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  iconDetails: {
    flexDirection: 'row',
    marginRight: 10,
  },
  usernameContainer: {
    marginTop: 5,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.light,
  },
  priceContainer: {
    marginTop: 5,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.lightblue,
  },
});

export default PropertyCard;
