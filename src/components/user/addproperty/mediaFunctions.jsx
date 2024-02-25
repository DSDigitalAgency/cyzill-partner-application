import { getStorage, ref, uploadFile, getDownloadURL, deleteObject } from '../../../../firebase';
import * as FileSystem from 'expo-file-system';


const storage = getStorage(); // Make sure to initialize your storage properly

export const uploadMediaAsync = async (uri, username) => {
  try {
    const folder = uri.startsWith('file') ? 'images' : 'videos'; // Adjust based on the file type
    const filename = uri.split('/').pop();
    const filePath = `users/${username}/media/${folder}/${filename}`;
    
    await uploadFile(ref(storage, filePath), uri);
    const url = await getDownloadURL(ref(storage, filePath));
    
    return { url, path: filePath, type: folder };
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
};

export const deleteMediaAsync = async (path) => {
  try {
    await deleteObject(ref(storage, path));
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error.message);
    throw error;
  }
};
