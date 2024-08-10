"use client";

import { useTranslations } from "next-intl";
import { Button, Link } from "@nextui-org/react";
import { MdEmail, MdLock } from "react-icons/md";;
import { CustomInput } from "./CustomInput";

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

  return (
    <form className="flex flex-col gap-4 pt-3">

      <CustomInput placeholder="email" type="email" startContent={<MdEmail />} />
      <CustomInput placeholder="password" type="password" startContent={<MdLock />} />

      <p className="text-center text-small">
        {tPage('alreadyHaveAccount')}{" "}
        <Link className="cursor-pointer" size="sm" onPress={() => props.action()}>
          {tPage('login')}
        </Link>
      </p>

      <div className="flex gap-2 justify-center">
        <Button onClick={handleSignUp} color="primary" type="button">
          {tButton('confirm')}
        </Button>
      </div>

    </form>
  )
}