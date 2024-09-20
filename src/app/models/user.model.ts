import { Timestamp } from "firebase/firestore";
import { Profile } from "next-auth";

export interface User {
  id?: string
  name: string;
  email: string;
  image: string;
  provider: ('google' | 'email'); // google | email
  password?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  profile?: Profile;
  country?: Country;
  zipCode?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: number;
  complement?: string;
  terms: boolean;
  emailVerified?: boolean;
}