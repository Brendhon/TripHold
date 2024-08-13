export interface FormValidation {
  key: string;
  required?: boolean;
  pattern?: RegExp;
  equal?: string;
};