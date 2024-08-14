import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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