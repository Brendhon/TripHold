"use client";

import { FormProps } from "@app/models";
import { Button } from "@nextui-org/react";
import { isFormValid } from "@utils/forms";
import { useTranslations } from "next-intl";
import { Children, cloneElement, isValidElement, ReactElement } from "react";
import toast from "react-hot-toast";

/**
 * Custom Form
 */
export function CForm<T>(props: FormProps<T>) {
  // Translations
  const t = useTranslations('Button');
  const tError = useTranslations("Error");

  // Get form data
  const { form, setForm, validations } = props.formdata;

  // Handle errors
  const handleErrors = (errors: string[] = []) => errors.forEach(error => toast.error(tError(error)));

  // Handle submit
  const handleSubmit = (e: any) => {
    // Prevent default - avoid page reload
    e.preventDefault();

    // Check if form is valid
    const { isValid, errors } = isFormValid<T>(validations, form);

    // Submit form if valid
    isValid ? props.submit.action() : handleErrors(errors);
  }

  // Handle input
  const handleChange = (e: any) => setForm((prevState: any) => {
    return {
      ...prevState,
      [e.target.name]: !!e.target.value ? e.target.value : e.target.checked
    }
  });

  // @ts-ignore - Apply handleChange to children recursively
  const applyOnChangeRecursively = (children: ReactNode): ReactNode => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        // Check if child has a name prop
        const { name } = (child as ReactElement).props;

        // @ts-ignore - Add handleChange to children with name prop
        const clonedChild = name ? cloneElement(child, { ...child.props, handleChange: handleChange }) : child;

        // Check if child has children and apply recursively
        if ((child as ReactElement).props && (child as ReactElement).props.children) {
          // @ts-ignore
          return cloneElement(clonedChild, { children: applyOnChangeRecursively((child as ReactElement).props.children) });
        }

        // Return child
        return clonedChild;
      }

      // Return child
      return child;
    });
  };

  // Render form
  return (
    <form onSubmit={handleSubmit} {...props}>

      {/* Add handle input to children and inside children */}
      {applyOnChangeRecursively(props.children)}

      {/* Add submit button */}
      <div className="form-row justify-center pt-2">
        <Button color="primary" type="submit"> {t(props.submit.text)} </Button>
      </div>

    </ form>
  )
}