"use client";

import { Key, useState } from "react";
import { Tabs, Tab, Card, CardBody, Divider } from "@nextui-org/react";
import { LoginForm, GoogleBtn, Header, Structure, RegisterForm, } from "components";
import { useTranslations } from "next-intl";


type TabsOptions = 'login' | 'sign-up';

export default function Login() {
  const [selected, setSelected] = useState<TabsOptions>("login");

  // Translations
  const tPage = useTranslations("LoginAndRegister");

  // Render
  return (
    <Structure>
      <Header hideProfile />
      <main className="flex items-center justify-center h-auto">
        <Card className="min-w-96 gap-4">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              variant="underlined"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={(key: Key) => setSelected(key as TabsOptions)}
            >
              <Tab key="login" title={tPage('login')} className="p-4">

                <LoginForm action={() => setSelected("sign-up")} />

                <Divider className="my-4" />

                <div className="flex justify-center items-center gap-4">
                  <GoogleBtn />
                </div>

              </Tab>

              <Tab key="sign-up" title={tPage('signUp')}>
                <div className="flex justify-center items-center gap-4">
                  <GoogleBtn />
                </div>

                <Divider className="my-4" />

                <RegisterForm action={() => setSelected("login")} />
              </Tab>

            </Tabs>
          </CardBody>
        </Card>
      </main>
    </Structure>
  )
}