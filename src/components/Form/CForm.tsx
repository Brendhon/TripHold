"use client";

import { FormProps } from "@app/models";
import { Button } from "@nextui-org/react";
import { isFormValid } from "@utils/common";
import { useTranslations } from "next-intl";
import { Children, cloneElement, isValidElement } from "react";

/**
 * Custom Form
 */
export function CForm(props: FormProps) {
  // Translations
  const t = useTranslations('Button');
  const tError = useTranslations("Error");

  // Handle submit
  const handleSubmit = (e: any) => {
    // Prevent default - avoid page reload
    e.preventDefault();

    // Check if form is valid
    if (!isFormValid(props.validations, props.form, tError)) return;

    // Submit form
    props.submit.action();
  }

  // Handle input
  const handlechange = (e: any) => props.setForm((prevState: any) => ({
    ...prevState,
    [e.target.name]: !!e.target.value ? e.target.value : e.target.checked
  }));

  // @ts-ignore - Apply handle input to children recursively
  const applyOnChangeRecursively = (children: ReactNode): ReactNode => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        // Check if child has a name prop
        const { name } = (child as React.ReactElement).props;

        // @ts-ignore - Add handle input to children with name prop
        const clonedChild = name ? cloneElement(child, { ...child.props, onChange: handlechange }) : child;

        // Check if child has children and apply recursively
        if ((child as React.ReactElement).props && (child as React.ReactElement).props.children) {
          // @ts-ignore
          return cloneElement(clonedChild, { children: applyOnChangeRecursively((child as React.ReactElement).props.children) });
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
    <form onSubmit={handleSubmit} {...props} onChange={() => console.log('change')}>

      {/* Add handle input to children and inside children */}
      {applyOnChangeRecursively(props.children)}

      {/* Add submit button */}
      <div className="form-row justify-center pt-2">
        <Button color="primary" type="submit"> {t(props.submit.text)} </Button>
      </div>

    </ form>
  )
}