export interface FormValidation<T> {
  key: T;
  required?: boolean;
  pattern?: RegExp;
  equal?: T;
};

export interface UserFormModel {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  zipCode: string;
  state: string;
  city: string;
  terms: boolean;
}

export interface UserSignInModel {
  email: string;
  password: string;
}