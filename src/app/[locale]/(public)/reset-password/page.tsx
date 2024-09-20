"use client";

import { ResetPasswordModel } from "@app/models";
import { Card, CardBody } from "@nextui-org/react";
import { createValidator, useForm } from "@utils/forms";
import { verifyToken } from "@utils/jwt";
import { passwordRegex, testRegex } from "@utils/regex";
import { Form, Input } from "components";
import { resetUserPassword } from "lib/firebase/auth/users";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdLock } from "react-icons/md";

export default function ResetPassword() {
  // Form state
  const { form, setForm } = useForm<ResetPasswordModel>();

  // States
  const [error, setError] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  // Translations
  const tPage = useTranslations("ResetPassword");

  // Validate token
  useEffect(() => validateToken(), []);

  // Router
  const router = useRouter();

  // Redirect to login
  const redirectToLogin = () => router.push("/login");

  // Validate token
  const validateToken = () => {
    try {
      // Get token from URL query
      const query = new URL(window.location.href);
      const token = query.searchParams.get("token");

      // Check if token exists
      if (!token) throw new Error("Token not found");

      // Decode token
      const decoded: any = verifyToken(token);

      switch (true) {
        case !decoded:
        case decoded.exp < Date.now() / 1000:
        case !decoded.email:
          throw new Error(`Invalid token: ${JSON.stringify(decoded)}`);
        default:
          setEmail(decoded.email);
          break;
      }
    } catch (error) {
      handleError(error);
    }
  }

  // User fields validations
  const { validations } = createValidator<ResetPasswordModel>([
    { key: 'password', required: true, pattern: passwordRegex },
    { key: 'confirmPassword', required: true, pattern: passwordRegex, equal: 'password' },
  ]);

  // Handle error
  const handleError = (error: any) => {
    console.error(error);
    setError(true);
  }

  // Handle reset password
  const handleResetPassword = async () => {
    try {
      // Reset user password
      await resetUserPassword(email!, form.password!);

      // Redirect to login
      redirectToLogin();
    } catch (error) {
      handleError(error);
    }
  }

  // Render
  return (
    <Card className="gap-4 p-4">
      <CardBody className="flex gap-3 flex-col">
        <h1 className="text-3xl">{tPage('title')}</h1>
        <Form
          formdata={{ form, setForm, validations }}
          submit={{ action: handleResetPassword, text: 'confirm' }}
          className={`flex flex-col gap-2 pt-3 sm:min-w-96`} >
          <Input
            name="password"
            type="password"
            autoComplete="none"
            placeholder="newPassword"
            isInvalid={testRegex(passwordRegex, form.password!)}
            errorMessage="password.pattern"
            startContent={<MdLock />} />
          <Input
            name="confirmPassword"
            type="password"
            autoComplete="none"
            placeholder="confirmNewPassword"
            isInvalid={form.password != form.confirmPassword}
            errorMessage="password.notMatch"
            startContent={<MdLock />} />
        </Form>
      </CardBody>
    </Card >
  )
}