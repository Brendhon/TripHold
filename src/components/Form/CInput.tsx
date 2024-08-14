"use client";

import { useTranslations } from "next-intl";
import { Input } from "@nextui-org/react";
import { MdRemoveRedEye } from "react-icons/md";
import { useState, } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { CInputProps } from "@app/models";

/**
 * Custom Input
 */
export function CInput(props: CInputProps) {
  // State to view password
  const [viewPassword, setViewPassword] = useState(false);

  // Translations
  const t = useTranslations('Placeholder');

  // Error translations
  const tError = useTranslations('Error');

  return (
    <Input
      {...props}
      variant="faded"
      color="default"
      classNames={{ input: ["placeholder:text-grey-light"] }}
      aria-label={t(props?.placeholder)}
      placeholder={t(props?.placeholder)}
      startContent={props?.startContent}
      onChange={props.handleChange}
      errorMessage={tError(props?.errorMessage || 'invalidField')}
      endContent={
        props?.type == 'password' ?
          viewPassword
            ? <IoMdEyeOff className="cursor-pointer" onClick={() => setViewPassword(!viewPassword)} />
            : <MdRemoveRedEye className="cursor-pointer" onClick={() => setViewPassword(!viewPassword)} />
          : null
      }
      type={props?.type == 'password' && viewPassword ? 'text' : props?.type}
    />)
}