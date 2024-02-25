import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../components/actions/userActions';

import { Color } from '../../assets/themes/theme';


const HomeScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { currentUser, loading } = useSelector((state) => state.user);
    const [username, setUsername] = useState(currentUser?.username);
  
    useEffect(() => {
      // Fetch user profile when the component mounts 
      dispatch(fetchUserProfile());
    }, [dispatch]);
  
    useEffect(() => {
      // Update local state when currentUser changes
      if (currentUser && currentUser.others) {
        setUsername(currentUser.others.username || '');
      }
    }, [currentUser]);
  
    const listPropertiesPress = () => {
      navigation.navigate('ListedProperties');
    };
  
    const addPropertyPress = () => {
      navigation.navigate('AddProperty');
    };
  
    const profilePress = () => {
      navigation.navigate('Profile');
    };
  
    const settingsPress = () => {
      navigation.navigate('Settings');
    };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.username}>
        <Text style={styles.welcometext}>Welcome</Text>
        {loading ? (
          <Text style={styles.usernametext}>Loading...</Text>
        ) : (
          <Text style={styles.usernametext}>{username}</Text>
        )}
      </View>
      <View style={styles.contentcontainer}>
        <View style={styles.containerbox}>
          <TouchableOpacity onPress={listPropertiesPress} style={styles.containerboxcontent}>
            <Icon name="home" style={styles.propertylisticon} />
            <Text style={styles.propertylisttext}>Your Properties</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerbox}>
          <TouchableOpacity onPress={addPropertyPress} style={styles.containerboxcontent}>
            <Icon name="plus-circle" style={styles.propertylisticon} />
            <Text style={styles.propertylisttext}>Add Property</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerbox}>
          <TouchableOpacity onPress={profilePress} style={styles.containerboxcontent}>
            <Icon name="user" style={styles.propertylisticon} />
            <Text style={styles.propertylisttext}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerbox}>
          <TouchableOpacity onPress={settingsPress} style={styles.containerboxcontent}>
            <Icon name="cog" style={styles.propertylisticon} />
            <Text style={styles.propertylisttext}>Settings</Text>
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
  username: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.linecolor,
  },
  welcometext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.white,
    marginBottom: 2,
  },
  usernametext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.white,
  },
  contentcontainer: {
    padding: 20,
  },
  containerbox: {
    margin: 20,
  },
  containerboxcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    height: 75,
    borderColor: Color.lightblue
  },
  propertylisticon: {
    fontSize: 24,
    marginRight: 10,
    color: Color.blue, // Set your icon color
  },
  propertylisttext: {
    fontSize: 16,
    color: Color.white,
  },
});

export default HomeScreen;
