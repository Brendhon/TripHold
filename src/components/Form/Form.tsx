"use client";

import { FormProps } from "@app/models";
import { Button } from "@nextui-org/react";
import { isFormValid } from "@utils/forms";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Children, cloneElement, isValidElement, ReactElement, useState } from "react";
import toast from "react-hot-toast";

/**
 * Custom Form
 */
export function Form<T>(props: FormProps<T>) {
  // Loading
  const [loading, setLoading] = useState(false);

  // Translations
  const t = useTranslations('Button');
  const tError = useTranslations("Error");

  // Router
  const router = useRouter();

  // Get form data
  const { form, setForm, validations } = props.formdata;

  // Handle errors
  const handleErrors = (errors: string[] = []) => errors.forEach(error => toast.error(tError(error)));

  // Handle submit
  const handleSubmit = async (e: any) => {
    // Prevent default - avoid page reload
    e.preventDefault();

    // Set loading
    setLoading(true);

    // Check if form is valid
    const { isValid, errors } = isFormValid<T>(validations, form);

    // Submit form if valid
    isValid ? await props.submit.action() : handleErrors(errors);

    // Set loading
    setLoading(false);
  }

  // Handle target value 
  const handleValue = (e: any) => {
    switch (e.target.type) {
      case 'checkbox':
        return e.target.checked;
      case 'number':
        return parseInt(e.target.value);
      default:
        return e.target.value;
    }
  }

  // Handle input
  const handleChange = (e: any) => setForm((prevState: any) => ({ ...prevState, [e.target.name]: handleValue(e) }));

  // @ts-ignore - Apply handleChange to children recursively
  const applyOnChangeRecursively = (children: ReactNode): ReactNode => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        // Check if child has a name prop
        const { name } = (child as ReactElement).props;

        // @ts-ignore - Add handleChange to children with name prop
        const clonedChild: ReactElement = name ? cloneElement(child, { ...child.props, handleChange: handleChange, controller: form[name] }) : child;

        // Check if child has children and apply recursively
        if ((child as ReactElement).props && (child as ReactElement).props.children) {
          return cloneElement(clonedChild, { children: applyOnChangeRecursively((child as ReactElement).props.children) });
        }

        // Return child
        return clonedChild;
      }

      // Return child
      return child;
    });
  };

  // Check if has cancel button
  const hasCancelButton = props.cancel ? !props.cancel.hidden : false;

  // Render form
  return (
    <form onSubmit={handleSubmit} {...props}>

      {/* Add handle input to children and inside children */}
      {applyOnChangeRecursively(props.children)}

      {/* Add submit button */}
      <div className={`flex pt-2 ${hasCancelButton ? 'justify-between' : 'justify-center'}`}>
        {hasCancelButton &&
          <Button
            color="default"
            onClick={props.cancel?.action ? props.cancel.action : () => router.back()}>
            {t(props.cancel?.text)}
          </Button>
        }
        <Button
          isLoading={loading}
          color="primary"
          type="submit">
          {t(props.submit.text)}
        </Button>
      </div>

    </ form>
  )
}