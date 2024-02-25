import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { uploadMediaAsync, deleteMediaAsync } from './mediaFunctions'; // You need to implement these functions

const Media = ({ formData, saveFormData }) => {
  const [media, setMedia] = useState([]);
  const { currentUser } = useSelector(state => state.user);
  const username = currentUser?.others?.username || currentUser?.username;

  useEffect(() => {
    const urls = media.map(file => file.url);
    saveFormData({ ...formData, photos: urls });
  }, [media]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const file = await uploadMediaAsync(result.uri, username); // Implement this function
      setMedia(prevMedia => [...prevMedia, file]);
    }
  };

  const removeFile = async (index) => {
    const file = media[index];
    await deleteMediaAsync(file.path); // Implement this function
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload your files</Text>
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>Upload Files</Text>
        </TouchableOpacity>
        <ScrollView style={styles.previewContainer} horizontal>
          {media.map((file, index) => (
            <View key={index} style={styles.previewItem}>
              {file.type === 'images' ? (
                <Image source={{ uri: file.url }} style={styles.previewImage} />
              ) : (
                <Video source={{ uri: file.url }} style={styles.previewVideo} />
              )}
              <Ionicons
                name="close-circle"
                size={24}
                color="red"
                style={styles.closeIcon}
                onPress={() => removeFile(index)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  uploadContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  uploadButton: {
    flex: 1,
    marginRight: 5,
    padding: 10,
    backgroundColor: '#2c68f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: 'white',
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  previewItem: {
    position: 'relative',
    marginRight: 5,
    marginBottom: 5,
  },
  previewImage: {
    width: 90,
    height: 70,
    borderRadius: 8,
  },
  previewVideo: {
    width: 90,
    height: 70,
    borderRadius: 8,
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },
});

export default Media;
