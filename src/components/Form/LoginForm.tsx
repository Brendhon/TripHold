"use client";

import { LoginFormProps, UserSignInModel } from "@app/models";
import { Link } from "@nextui-org/react";
import { createValidator, useForm } from "@utils/forms";
import { emailRegex, passwordRegex, testRegex } from "@utils/regex";
import { useTranslations } from "next-intl";
import { MdEmail, MdLock } from "react-icons/md";
import { CForm } from "./CForm";
import { CInput } from "./CInput";

/**
 * Custom Input
 */
export function LoginForm(props: LoginFormProps) {
  // Form state
  const { form, setForm } = useForm<UserSignInModel>();

  // Handle login
  const handleLogin = () => {
    console.log(form);
  }

  // Translations
  const tPage = useTranslations("LoginAndRegister");

  // User fields validations
  const { validations } = createValidator<UserSignInModel>([
    { key: 'email', required: true, pattern: emailRegex },
    { key: 'password', required: true, pattern: passwordRegex },
  ]);

  return (
    <CForm
      formdata={{ form, setForm, validations }}
      submit={{ action: handleLogin, text: 'login' }}
      className={`flex flex-col gap-2 pt-3 sm:min-w-96 ${props.className}`} >

      <CInput
        name="email"
        type="email"
        placeholder="email"
        isInvalid={testRegex(emailRegex, form.email!)}
        errorMessage="email.pattern"
        startContent={<MdEmail />} />
      <CInput
        name="password"
        type="password"
        autoComplete="none"
        placeholder="password"
        isInvalid={testRegex(passwordRegex, form.password!)}
        errorMessage="password.pattern"
        startContent={<MdLock />} />

      <Link className="cursor-pointer text-center justify-end" size="sm">
        {tPage('forgotPassword')}
      </Link>

      <p className="text-center text-small">
        {tPage('dontHaveAccount')}{" "}
        <Link className="cursor-pointer" size="sm" onPress={() => props.action()}>
          {tPage('signUp')}
        </Link>
      </p>

    </CForm>
  )
}