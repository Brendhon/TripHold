"use client";

import { LoginFormProps, UserSignInModel } from "@app/models";
import { Link } from "@nextui-org/react";
import { createValidator, useForm } from "@utils/forms";
import { emailRegex, passwordRegex, testRegex } from "@utils/regex";
import { sendForgotPasswordEmail } from "lib/email/user";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdEmail, MdLock } from "react-icons/md";
import { Form } from "./Form";
import { Input } from "./Input";

/**
 * Custom Input
 */
export function LoginForm(props: LoginFormProps) {
  // Form state
  const { form, setForm } = useForm<UserSignInModel>();
  const [hasForgotPassword, setHasForgotPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  // Router hook
  const router = useRouter();

  // Translations
  const tPage = useTranslations("Form");
  const tError = useTranslations("Error");

  // Locale
  const locale = useLocale();

  // Set loading to false on component mount
  useEffect(() => setLoading(false), []);

  // Handle login
  const handleLogin = async () => {
    try {
      // Sign in user
      const error = await signIn("credentials", { email: form.email, password: form.password, redirect: false });

      // Check if there is an error
      if (error?.error) throw error;

      // Show success message
      toast.success(tPage('loginSuccess'));

      // Redirect to home page
      router.push("/home");
    } catch (error: any) {
      // Log error
      console.error("Error logging in:", error);

      // Show error message
      toast.error(tError(error.error ?? 'loginError'));
    }
  };

  // User fields validations
  const { validations } = createValidator<UserSignInModel>([
    { key: 'email', required: true, pattern: emailRegex },
    { key: 'password', required: true, pattern: passwordRegex },
  ]);

  // Forgot password
  const forgotPassword = async () => {
    // Set forgot password flag
    setHasForgotPassword(true);

    // Check if email is empty
    if (!form.email) return;

    // Send forgot password email
    await sendForgotPasswordEmail(form.email, locale);

    // Show success message
    toast.success(tPage('forgotPasswordSuccess'));
  }

  return (
    <Form
      formdata={{ form, setForm, validations }}
      submit={{ action: handleLogin, text: 'login' }}
      className={`flex flex-col gap-2 pt-3 sm:min-w-96 ${props.className}`} >

      <Input
        autoFocus
        disabled={loading}
        name="email"
        type="email"
        placeholder="email"
        isInvalid={testRegex(emailRegex, form.email!)}
        errorMessage="email.pattern"
        startContent={<MdEmail />} />
      <Input
        name="password"
        disabled={loading}
        type="password"
        placeholder="password"
        isInvalid={testRegex(passwordRegex, form.password!)}
        errorMessage="password.pattern"
        startContent={<MdLock />} />

      <Link onClick={forgotPassword} className="flex flex-col cursor-pointer text-end justify-end items-end" size="sm">
        {tPage('forgotPassword')}
        {hasForgotPassword && !form.email && <span className="text-orange-regular text-[12px]">{tError('email.required')}</span>}
      </Link>

      <p className="text-center text-small">
        {tPage('dontHaveAccount')}{" "}
        <Link className="cursor-pointer" size="sm" onPress={() => props.action()}>
          {tPage('signUp')}
        </Link>
      </p>

    </Form>
  )
}