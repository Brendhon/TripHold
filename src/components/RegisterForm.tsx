"use client";

import { useTranslations } from "next-intl";
import { Button, Link } from "@nextui-org/react";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";;
import { CustomInput } from "./CustomInput";
import { IoMdGlobe } from "react-icons/io";

interface Props {
  action: () => void;
}

/**
 * Register Form
 */
export function RegisterForm(props: Props) {

  // Handle sign up
  const handleSignUp = () => {
    console.log("Sign up");
  }

  // Translations
  const tPage = useTranslations("LoginAndRegister");
  const tButton = useTranslations("Button");

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'es', label: 'Spain' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'de', label: 'Germany' },
  ]

  const states = [
    { value: 'ny', label: 'New York' },
    { value: 'ca', label: 'California' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' },
    { value: 'il', label: 'Illinois' },
  ]

  return (
    <form className="flex flex-col gap-4 pt-3">

      <div className="form-row">
        <CustomInput placeholder="name" type="text" startContent={<MdPerson />} />
        <CustomInput placeholder="email" type="email" startContent={<MdEmail />} />
      </div>

      <div className="form-row">
        <CustomInput placeholder="password" type="password" startContent={<MdLock />} />
        <CustomInput placeholder="confirmPassword" type="password" startContent={<MdLock />} />
      </div>

      <div className="form-row">
        <CustomInput placeholder="countrySelect" type="select" options={countries} startContent={<IoMdGlobe  />} />
        <CustomInput className="w-56" placeholder="zipCode" type="number" />
      </div>

      <p className="text-center text-small">
        {tPage('alreadyHaveAccount')}{" "}
        <Link className="cursor-pointer" size="sm" onPress={() => props.action()}>
          {tPage('login')}
        </Link>
      </p>

      <div className="form-row justify-center">
        <Button onClick={handleSignUp} color="primary" type="button">
          {tButton('confirm')}
        </Button>
      </div>

    </form>
  )
}