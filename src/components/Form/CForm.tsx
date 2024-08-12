"use client";

import { FormProps } from "@app/models";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

/**
 * Custom Form
 */
export function CForm(props: FormProps) {
  // Translations
  const t = useTranslations('Button');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.submit();
  }

  return (
    <form onSubmit={handleSubmit} {...props}>

      {/* Add handle input to children and inside children */}
      {props.children}

      {/* Add submit button */}
      <div className="form-row justify-center pt-2">
        <Button color="primary" type="submit"> {t(props.submittext)} </Button>
      </div>

    </ form>
  )
}