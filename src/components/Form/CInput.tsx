"use client";

import { useTranslations } from "next-intl";
import { Input, InputProps } from "@nextui-org/react";
import { MdRemoveRedEye } from "react-icons/md";
import { useState, } from "react";
import { IoMdEyeOff } from "react-icons/io";

type Type = 'text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'number';

interface Props extends Partial<InputProps> {
  type: Type;
  placeholder: string;
  options?: { value: any, label: string }[];
}

/**
 * Custom Input
 */
export function CInput(props: Props) {
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