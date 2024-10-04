"use client";

import { Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import { GoogleBtn, LoginForm, UserForm } from "components";
import { useTranslations } from "next-intl";
import { Key, useState } from "react";

type TabsOptions = 'login' | 'sign-up';

export default function Login() {
  // Tabs
  const [selected, setSelected] = useState<TabsOptions>("login");

  // Translations
  const tPage = useTranslations("Form");

  // Google Sign In
  const GSignIn = () => <div className="flex flex-col justify-center items-center gap-4"> <GoogleBtn /> </div>

  // Render
  return (
    <Card className="gap-4">
      <CardBody className="overflow-hidden">
        <Tabs
          fullWidth
          size="lg"
          variant="light"
          color="default"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={(key: Key) => setSelected(key as TabsOptions)}
        >
          <Tab key="login" title={tPage('login')} className="p-4">

            <LoginForm action={() => setSelected("sign-up")} />

            <Divider className="my-4" />

            <GSignIn />

          </Tab>

          <Tab key="sign-up" title={tPage('signUp')} className="p-4">

            <GSignIn />

            <Divider className="my-4" />

            <UserForm action={() => setSelected("login")} />

          </Tab>

        </Tabs>
      </CardBody>
    </Card>
  )
}