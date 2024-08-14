import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

export const createUserSignUp = async (email: string, password: string) => {
  // Create user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Return user data
  return userCredential.user;
}