import { getStorageUsersPath } from "@utils/paths";
import { storage } from "../config";
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { updateFirestoreUser } from "../firestore/users";

/**
 * Upload user avatar to Firebase storage
 * @param {Blob} blob Valid image blob
 * @param {string} userId User ID
 * @returns {Promise<string>} Download URL of the image
 */
export const uploadUserAvatar = async (blob: Blob, userId: string): Promise<string> => {
  // Create a reference to the storage service
  const storageRef = ref(storage, getStorageUsersPath(userId));

  // Upload the image
  await uploadBytes(storageRef, blob);

  // Get the download URL
  const url = await getDownloadURL(storageRef);

  // Update the user avatar in the firestore
  await updateFirestoreUser({ id: userId, image: url });

  // Return the download URL
  return url;
};

/**
 * Delete user avatar from Firebase storage
 * @param {string} userId User ID
 * @returns {Promise<string>} Empty string
 */
export const deleteUserAvatar = async (userId: string): Promise<string> => {
  try {
    // Create a reference to the storage service
    const storageRef = ref(storage, getStorageUsersPath(userId));

    // Delete the image
    await deleteObject(storageRef);

    // Update the user avatar in the firestore
    await updateFirestoreUser({ id: userId, image: "" });
  } catch (error) {
    console.error("Error deleting user avatar: ", error);
  }

  // Return empty string
  return '';
}