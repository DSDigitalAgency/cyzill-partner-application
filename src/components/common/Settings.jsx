import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native';

import { Color } from '../../../assets/themes/theme';


const Settings = ({ navigation }) => {

    const aboutusUrl = 'https://cyzill.com/';
  
    const aboutusPress = () => {
        navigation.navigate('About Us');
    };
  
    const privacypolicyPress = () => {
      navigation.navigate('Privacy Policy');
    };
  
    const termsofservicesPress = () => {
      navigation.navigate('Terms of Services');
    };
  
    const faqsPress = () => {
        navigation.navigate("FAQ's");
    };
    const contactPress = () => {
        navigation.navigate("Contact Us");
    };
    const fairusPress = () => {
      navigation.navigate("Fair Use");
    };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentcontainer}>
        
        <View style={styles.containerbox}>
          <TouchableOpacity onPress={aboutusPress} style={styles.containerboxcontent}>
            <Text style={styles.contenttext}>About Us</Text>
            <Icon name="caret-right" style={styles.contenticon} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerbox}>
          <TouchableOpacity onPress={privacypolicyPress} style={styles.containerboxcontent}>
            <Text style={styles.contenttext}>Privacy Policy</Text>
            <Icon name="caret-right" style={styles.contenticon} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerbox}>
          <TouchableOpacity onPress={termsofservicesPress} style={styles.containerboxcontent}>
            <Text style={styles.contenttext}>Terms of Services</Text>
            <Icon name="caret-right" style={styles.contenticon} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerbox}>
          <TouchableOpacity onPress={faqsPress} style={styles.containerboxcontent}>
            <Text style={styles.contenttext}>FAQ's</Text>
            <Icon name="caret-right" style={styles.contenticon} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerbox}>
          <TouchableOpacity onPress={contactPress} style={styles.containerboxcontent}>
            <Text style={styles.contenttext}>Contact Us</Text>
            <Icon name="caret-right" style={styles.contenticon} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerbox}>
          <TouchableOpacity onPress={fairusPress} style={styles.containerboxcontent}>
            <Text style={styles.contenttext}>Fair Us</Text>
            <Icon name="caret-right" style={styles.contenticon} />
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
  contentcontainer: {
    padding: 5,
    marginTop: 30,
  },
  containerbox: {
    margin: 5,
    backgroundColor: Color.ccbgcolor,
    borderRadius: 10,

  },
  containerboxcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.light,
    padding: 10,
    borderRadius: 15,
  },
  contenttext: {
    fontSize: 16,
    color: Color.white,
    marginRight: 'auto',
  },
  contenticon: {
    fontSize: 24,
    marginLeft: 'auto',
    marginRight: 10,
    color: Color.blue,
  },
  
});

export default Settings;
