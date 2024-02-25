import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import googleicon from '../../../assets/images/googleicon.png';
import appleicon from '../../../assets/images/appleicon.png';
import facebookicon from '../../../assets/images/facebookicon.png';

const OauthLogin = () => {

    const handleLoginGoogle = () => {
        console.log('Google login button pressed');
      };
    const handleLogineApple = () => {
        console.log('Apple login button pressed');
      };
    const handleLoginFacebook = () => {
        console.log('Facebook login button pressed');
      };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
      <TouchableOpacity onPress={handleLoginGoogle} style={styles.button}>
        <Image source={googleicon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogineApple} style={styles.button}>
        <Image source={appleicon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginFacebook} style={styles.button}>
        <Image source={facebookicon} style={styles.icon} />
      </TouchableOpacity>

      {/* Add buttons for Apple and Facebook similarly */}
    </View>
  );
};

const styles = {
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  // Add styles for other buttons as needed
};

export default OauthLogin;
