import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword
} from "firebase/auth";
import { auth } from "../config";

/**
 * Create user sign up
 * @param {string} email User email
 * @param {string} password User password
 * @returns User data
 */
export const createUserSignUp = async (email: string, password: string) => {
  // Create user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Return user data
  return userCredential.user;
}

/**
 * Sign in user
 * @param {string} email User email
 * @param {string} password User password
 * @returns User data
 */
export const signInUser = async (email: string, password: string) => {
  // Sign in user
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  // Return user data
  return userCredential.user;
}

/**
 * Update user password
 * @param {string} currentPassword User current password
 * @param {string} password  User new password
 * @returns User data after update
 */
export const updateUserPassword = async (currentPassword: string, password: string) => {
  // Check if user is authenticated
  if (!auth.currentUser) return;

  try {
    // Create the credential with the current email and password
    const credential = EmailAuthProvider.credential(auth.currentUser.email!, currentPassword);

    // Reauthenticate the user
    await reauthenticateWithCredential(auth.currentUser, credential);

    // Update the password
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    console.error("Error updating user password:", error);
    throw error; // Re-throw the error to handle it in your UI or further logic
  }
}