import { InputProps, SelectProps, AutocompleteProps, CheckboxProps } from "@nextui-org/react";
import { ReactNode, HTMLProps } from "react";
import { FormValidation } from "./form.model";
import { Trip } from "./trip.model";

export interface HeaderProps {
  hideProfile?: boolean;
  countryFlag?: string;
  className?: string;
  isLogoClickable?: boolean;
}

export interface StructureProps {
  mainProps?: HTMLProps<HTMLDivElement>;
  headerProps?: HeaderProps;
  children: ReactNode;
}

export interface GoogleBtnProps {
  content?: string;
  action?: () => void;
}

export interface RegisterFormProps {
  action: () => void;
  className?: string;
}

export interface LoginFormProps {
  action: () => void;
  className?: string;
}

export interface CSelectProps extends Partial<SelectProps> {
  placeholder: string;
  options?: { key: any, name: string }[];
  handleChange?: (e: any) => void;
}

export interface CAutocompleteProps extends Partial<AutocompleteProps> {
  placeholder: string;
  options?: { key: any, name: string }[];
  handleChange?: (e: any) => void;
}

export interface CCheckboxProps extends Partial<CheckboxProps> {
  children: ReactNode;
  handleChange?: (e: any) => void;
}

export interface CInputProps extends Partial<InputProps> {
  type: ('text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'number');
  placeholder: string;
  options?: { value: any, label: string }[];
  handleChange?: (e: any) => void;
}

export interface FormProps<T> extends HTMLProps<HTMLFormElement> {
  formdata: {
    form: any;
    setForm: any;
    validations: FormValidation<T>[];
  };

  // Children
  children: ReactNode;

  // Submit function
  submit: {
    action: () => any | Promise<any>;
    text: string;
  };

  // Cancel function
  cancel?: {
    action: () => void;
    text: string;
  };
}

export interface TripCardProps extends HTMLProps<HTMLDivElement> {
  trip?: Trip;
}