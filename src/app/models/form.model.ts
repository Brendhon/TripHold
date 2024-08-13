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
  neighborhood: string;
  street: string;
  number: number;
  complement: string;
  terms: boolean;
}