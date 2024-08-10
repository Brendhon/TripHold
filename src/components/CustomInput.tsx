"use client";

import { useTranslations } from "next-intl";
import { Input } from "@nextui-org/react";
import { MdRemoveRedEye } from "react-icons/md";
import { ReactNode, useState } from "react";
import { IoMdEyeOff } from "react-icons/io";

interface Props {
  type?: 'text' | 'search' | 'url' | 'tel' | 'email' | 'password';
  placeholder?: string;
  startContent?: ReactNode;
}

/**
 * Custom Input
 */
export function CustomInput(props?: Props) {
  // State to view password
  const [viewPassword, setViewPassword] = useState(false);

  // Translations
  const t = useTranslations('Placeholder');

  return (
    <Input
      isRequired
      variant="faded"
      color="default"
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
    />
  )
}