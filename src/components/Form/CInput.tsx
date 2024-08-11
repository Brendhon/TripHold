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

  return (
    <Input
      {...props}
      isRequired
      variant="faded"
      color="default"
      classNames={{ input: ["placeholder:text-grey-light"] }}
      aria-label={t(props?.placeholder)}
      placeholder={t(props?.placeholder)}
      startContent={props?.startContent}
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