import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from '../redux/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Color } from "../../../assets/themes/theme";

const Logout = ({ navigation }) => {
    const dispatch = useDispatch();

    const onLogout = async () => {
        // Assuming you store user data in AsyncStorage
        try {
            // Clear user data from storage
            await AsyncStorage.removeItem('userData');

            // Dispatch the logout action to update Redux state
            dispatch(logout());

            // Navigate the user back to the login screen
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onLogout}>
            <Icon name="sign-out" style={styles.icon} />
            <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: Color.lightgray,
        borderRadius: 10,
        width: "50%",
        alignSelf: 'center',
    },
    icon: {
        fontSize: 20,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
        color: 'black', 
    },
});


export default Logout;
