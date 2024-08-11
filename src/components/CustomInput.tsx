"use client";

import { useTranslations } from "next-intl";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { MdRemoveRedEye } from "react-icons/md";
import { ReactNode, useState } from "react";
import { IoMdEyeOff } from "react-icons/io";

type Type = 'text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'select' | 'number';

interface Props {
  type: Type;
  placeholder: string;
  startContent?: ReactNode;
  options?: { value: any, label: string }[];
  className?: string;
}

const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, '')          // Remove qualquer caractere que não seja dígito
    .replace(/^(\d{5})(\d)/, '$1-$2') // Adiciona o hífen após os primeiros 5 dígitos
    .slice(0, 9);               // Limita a string a 9 caracteres
};

/**
 * Custom Input
 */
export function CustomInput(props: Props) {
  // State to view password
  const [viewPassword, setViewPassword] = useState(false);
  const [cep, setCep] = useState("");

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(formatCEP(e.target.value));
  };

  // Translations
  const t = useTranslations('Placeholder');

  // Zip code regex
  const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

  // Render switch
  const renderSwitch = (type: Type) => {
    switch (type) {
      case 'select':
        return (
          <Select
            isRequired
            variant="faded"
            color="default"
            className={props?.className}
            aria-label={t(props?.placeholder)}
            placeholder={t(props?.placeholder)}
            startContent={props?.startContent}
          >
            {props!.options!.map((option, index) => (
              <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
        )
      default:
        return (
          <Input
            isRequired
            variant="faded"
            color="default"
            className={props?.className}
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
          />
        )
    }
  }

  return (<> {renderSwitch(props?.type || 'text')} </>)
}