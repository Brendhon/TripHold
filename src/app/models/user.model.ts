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

// user creation form
export class UserForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.country = '';
    this.zipCode = '';
    this.state = '';
    this.city = '';
    this.neighborhood = '';
    this.street = '';
    this.number = 0;
    this.complement = '';
  }
}