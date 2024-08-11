"use client";

import { useTranslations } from "next-intl";
import { Button, Link } from "@nextui-org/react";
import { MdEmail, MdLock } from "react-icons/md";;
import { CInput } from "./CInput";

interface Props {
  action: () => void;
}

/**
 * Custom Input
 */
export function LoginForm(props: Props) {

  // Handle login
  const handleLogin = () => {
    console.log("Login");
  }

  // Translations
  const tPage = useTranslations("LoginAndRegister");
  const tButton = useTranslations("Button");

  return (
    <form className="flex flex-col gap-4 pt-3">

      <CInput placeholder="email" type="email" startContent={<MdEmail />} />
      <CInput placeholder="password" type="password" startContent={<MdLock />} />

      <Link className="cursor-pointer text-center justify-end" size="sm">
        {tPage('forgotPassword')}
      </Link>

      <p className="text-center text-small">
        {tPage('dontHaveAccount')}{" "}
        <Link className="cursor-pointer" size="sm" onPress={() => props.action()}>
          {tPage('signUp')}
        </Link>
      </p>

      <div className="flex gap-2 justify-center">
        <Button onClick={handleLogin} color="primary" type="button">
          {tButton('confirm')}
        </Button>
      </div>

    </form>
  )
}