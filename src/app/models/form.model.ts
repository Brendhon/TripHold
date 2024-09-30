export interface FormValidation<T> {
  key: T;
  required?: boolean;
  pattern?: RegExp;
  equal?: T;
};

export interface UserFormModel {
  name: string;
  email: string;
  currentPassword?: string;
  password: string;
  confirmPassword: string;
  country: string;
  zipCode: string;
  state: string;
  city: string;
  terms: boolean;
  latitude: number;
  longitude: number;
}

export interface UserSignInModel {
  email: string;
  password: string;
}

export interface ResetPasswordModel {	
  password: string;
  confirmPassword: string;
}