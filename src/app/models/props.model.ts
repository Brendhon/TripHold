import { InputProps, SelectProps } from "@nextui-org/react";
import { ReactNode, HTMLProps } from "react";
import { FormValidation } from "./form.model";

export interface HeaderProps {
  hideProfile?: boolean;
  countryFlag?: string;
  className?: string;
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
  options?: { value: any, label: string }[];
}

export interface CInputProps extends Partial<InputProps> {
  type: ('text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'number');
  placeholder: string;
  options?: { value: any, label: string }[];
}

export interface FormProps extends HTMLProps<HTMLFormElement> {
  form: any; // Form data
  setForm: any; // Set form data
  validations: FormValidation[]; // Form validations

  // Children
  children: any;

  // Submit function
  submit: {
    action: () => void;
    text: string;
  };

  // Cancel function
  cancel?: {
    action: () => void;
    text: string;
  };
}