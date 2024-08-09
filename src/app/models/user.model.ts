import { Timestamp } from "firebase/firestore";
import { Profile } from "next-auth";

export interface User {
  name: string;
  email: string; // ID
  image: string;
  provider: ('google' | 'email'); // google | email
  password?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  profile?: Profile;
}