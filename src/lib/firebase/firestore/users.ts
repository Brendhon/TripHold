import { doc, setDoc, Timestamp, getDoc, where, getDocs, deleteDoc, collection, query } from "firebase/firestore";
import { db, logAnalytics } from "../config";
import { User } from "@app/models";
import { getUsersPath } from "@utils/paths";
import { randomUUID } from "crypto";

/**
 * Create a new user
 * @param {User} user User data
 * @returns {User} Created user data
 */
export const createFirestoreUser = async (user: User): Promise<User> => {
  try {
    // Generate user ID
    user.id = user.id || randomUUID();

    // Get user path
    const path = getUsersPath(user.id);

    // Get user document
    const userDoc = doc(db, path);

    // Get user data
    const fd = await getDoc(userDoc);

    // form user data
    user = {
      ...user,
      createdAt: fd.exists() ? fd.data()?.createdAt : Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    // Create user document
    await setDoc(userDoc, user, { merge: true }); // Merge data if document exists or create a new document

    // Return user data
    return user;
  } catch (error) {
    console.error("Error creating user: ", error);
    logAnalytics("exception", error);
    throw error;
  }
}

/**
 * Update user data
 * @param {User} user User data
 * @returns Updated user data
 */
export const updateFirestoreUser = async (user: Partial<User>) => {
  try {
    // Get user path
    const path = getUsersPath(user.id);

    // Get user document
    const userDoc = doc(db, path);

    // Get user data
    const fd = await getDoc(userDoc);

    // Check if user exists
    if (!fd.exists()) return;

    // Update user document
    await setDoc(userDoc, {
      ...user,
      updatedAt: Timestamp.now(),
    }, { merge: true }); // Merge data if document exists or create a new document
  } catch (error) {
    console.error("Error updating user: ", error);
    logAnalytics("exception", error);
  }
}

/**
 * Get user data
 * @param {string} email User email
 * @returns {User} User data
 */
export const getFirestoreUser = async (email?: string): Promise<User | undefined> => {
  try {
    // Check if email exists
    if (!email) return;

    // Path to user collection
    const path = getUsersPath();

    // Get user collection
    const col = collection(db, path);

    // Get user by email
    const users = await getDocs(query(col, where("email", "==", email)));

    // Get user data
    return users.empty ? undefined : users.docs[0].data() as User;
  } catch (error) {
    console.error("Error getting user: ", error);
    logAnalytics("exception", error);
  }
}

/**
 * Delete user data
 */
export const deleteFirestoreUser = async (id: string) => {
  try {
    // Get user path
    const path = getUsersPath(id);

    // Get user document
    const userDoc = doc(db, path);

    // Delete user document
    await deleteDoc(userDoc);
  } catch (error) {
    console.error("Error deleting user: ", error);
    logAnalytics("exception", error);
  }
}