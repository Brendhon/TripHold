"use client";

import { Key, useState } from "react";
import { Tabs, Tab, Card, CardBody, Divider } from "@nextui-org/react";
import { LoginForm, GoogleBtn, Header, Structure, UserForm, } from "components";
import { useTranslations } from "next-intl";

type TabsOptions = 'login' | 'sign-up';

export default function Login() {
  // Tabs
  const [selected, setSelected] = useState<TabsOptions>("login");

  // Translations
  const tPage = useTranslations("LoginAndRegister");

  // Google Sign In
  const GSignIn = () => <div className="flex flex-col justify-center items-center gap-4"> <GoogleBtn /> </div>

  // Render
  return (
    <Structure
      headerProps={{ hideProfile: true }}
      mainProps={{ className: "md:flex md:flex md:justify-center md:items-center" }}>
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

    </Structure>
  )
}