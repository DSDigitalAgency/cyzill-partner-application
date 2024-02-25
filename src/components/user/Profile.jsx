import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../actions/userActions';
import { Color } from '../../../assets/themes/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

import LogOut from '../auth/LogOut';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email || currentUser?.others?.email);
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || currentUser?.others?.phoneNumber);
  const [photo, setPhoto] = useState(currentUser?.others?.photo || currentUser?.photo);

  useEffect(() => {
    // Fetch user profile when the component mounts
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleUpdateProfile = () => {
    // Handle update logic here
    // You can dispatch the updateProfile action with updated data
    // dispatch(updateProfile({ username, email, photo }));
    console.log('Update profile logic here');
  };

  const changeprofile = () => {
    console.log('Changed Press');
    // Implement logic to change profile picture
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentcontainer}>
        <View style={styles.profileContainer}>
          {photo ? (
            <Image style={styles.profileImage} source={{ uri: photo }} />
          ) : (
            <Text>No Photo Available</Text>
          )}
          <TouchableOpacity
            onPress={changeprofile}
            style={styles.changePictureButton}
          >
            <Text>Change Picture</Text>
          </TouchableOpacity>
          <View style={styles.userdetailssection}>
            <View style={styles.userdetails}>
              <Text style={styles.userheadings}>Username:</Text>
              <Text style={styles.userdata}>{username}</Text>
            </View>
            <View style={styles.userdetails}>
              <Text style={styles.userheadings}>Email:</Text>
              <Text style={styles.userdata}>{email}</Text>
            </View>
            <View style={styles.userdetails}>
              <Text style={styles.userheadings}>Phone:</Text>
              <Text style={styles.userdata}>{phoneNumber}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleUpdateProfile}
          style={styles.button}
        >
          <Text>Update Profile</Text>
        </TouchableOpacity>

        {/* Add your delete profile logic here */}
      </View>

      <LogOut navigation={navigation}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bgcolor,
  },
  contentcontainer: {
    padding: 16,
    marginTop: 30,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePictureButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  userdetailssection: {
    marginTop: 16,
    width: '100%',
  },
  userdetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    backgroundColor: Color.ccbgcolor,
    padding: 15,
    borderRadius: 10,
  },
  userheadings: {
    color: Color.white,
    fontWeight: 'bold',
  },
  userdata: {
    color: Color.white,
    marginLeft: 10,
  },
  button: {
    backgroundColor: Color.lightgray,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
});

export default Profile;
