import { doc, setDoc, Timestamp, getDoc } from "firebase/firestore";
import { db, logAnalytics } from "../config";
import { User } from "@app/models";
import { getUsersPath } from "@utils/paths";

/**
 * Create a new user
 * @param {User} user User data
 */
export const createUser = async (user: User) => {
  try {
    // Get user path
    const path = getUsersPath(user.email);

    // Get user document
    const userDoc = doc(db, path);

    // Create user document
    await setDoc(userDoc, {
      ...user,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }, { merge: true }); // Merge data if document exists or create a new document
  } catch (error) {
    console.error("Error creating user: ", error);
    logAnalytics("exception", error);
  }
}

/**
 * Get user data
 * @param {string} email User email
 * @returns User data
 */
export const getUser = async (email: string) => {
  try {
    // Path to user document
    const path = getUsersPath(email);

    // Get user document
    const userDoc = doc(db, path);

    // Get user data
    const fd = await getDoc(userDoc);

    // Return user data
    return fd.exists() ? fd.data() : null;
  } catch (error) {
    console.error("Error getting user: ", error);
    logAnalytics("exception", error);
  }
}