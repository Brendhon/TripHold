"use client";

import { FormProps } from "@app/models";
import { Button } from "@nextui-org/react";
import { isFormValid } from "@utils/common";
import { useTranslations } from "next-intl";

/**
 * Custom Form
 */
export function CForm(props: FormProps) {
  // Translations
  const t = useTranslations('Button');
  const tError = useTranslations("Error");

  const handleSubmit = (e: any) => {
    // Prevent default - avoid page reload
    e.preventDefault();

    // Check if form is valid
    if (!isFormValid(props.validations, props.form, tError)) return;

    // Submit form
    props.submit.action();
  }

  return (
    <form onSubmit={handleSubmit} {...props} >

      {/* Add handle input to children and inside children */}
      {props.children}

      {/* Add submit button */}
      <div className="form-row justify-center pt-2">
        <Button color="primary" type="submit"> {t(props.submit.text)} </Button>
      </div>

    </ form>
  )
}