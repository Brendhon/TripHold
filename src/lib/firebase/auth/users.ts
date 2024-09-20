import { User } from "@app/models";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { auth } from "../config";
import { getFirestoreUser } from "../firestore/users";

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
 * @param {string} password  User new password
 * @returns User data after update
 */
export const updateUserPassword = async (email: string, password: string) => {
  // Check if user is authenticated
  if (!email || !password) return;

  try {
    await resetUserPassword(email, password);
  } catch (error) {
    console.error("Error updating user password:", error);
    throw error; // Re-throw the error to handle it in your UI or further logic
  }
}

/**
 * Delete user account
 * @param {string} password User password
 * @returns User data after delete
 */
export const deleteUserAccount = async (password: string) => {
  // Check if user is authenticated
  if (!auth.currentUser) return;

  try {
    // Create the credential with the current email and password
    const credential = EmailAuthProvider.credential(auth.currentUser.email!, password);

    // Reauthenticate the user
    await reauthenticateWithCredential(auth.currentUser, credential);

    // Delete the user
    await deleteUser(auth.currentUser);
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw error; // Re-throw the error to handle it in your UI or further logic
  }
}

/**
 * Confirm user email
 * @param {User} user User data
 * @returns User data after email confirmation
 */
export const confirmUserEmail = async (user: Partial<User>) => {
  // Get user id
  const uid = user.id;
  
  // Get path
  const path = `/api/email/confirm/firebase`;

  // Send request to confirm email
  const resp = await axios.post(path, { uid });

  // Return response
  return resp.data;
}

/**
 * Send forgot password email
 * @param {string} email User email
 * @param {string} password User password
 * @returns Response data
 */
export const resetUserPassword = async (email: string, password: string) => {
  // Get path
  const path = `/api/email/reset/firebase`;
  
  // Check if email and password are provided
  if(!email || !password) throw new Error("Email and password are required");

  // get user from email
  const user = await getFirestoreUser(email);

  // Check if user exists
  if (!user) throw new Error("User not found");

  // Send request to reset password
  const resp = await axios.post(path, { email, password, uid: user?.id });

  // Return response
  return resp.data;
}