"use client";

import { Key, useState } from "react";
import { Tabs, Tab, Input, Link, Card, CardBody, Divider, Button } from "@nextui-org/react";
import { GoogleBtn, Header, Structure, } from "components";

type TabsOptions = 'login' | 'sign-up';

export default function Login() {
  const [selected, setSelected] = useState<TabsOptions>("login");

  // Handle login
  const handleLogin = () => {
    console.log("Login");
  }

  // Handle sign up
  const handleSignUp = () => {
    console.log("Sign up");
  }


  // Render
  return (
    <Structure>
      <Header hideProfile />
      <main className="flex items-center justify-center h-auto">
        <Card className="min-w-96">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              variant="underlined"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={(key: Key) => setSelected(key as TabsOptions)}
            >
              <Tab key="login" title="Login">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    variant="faded"
                    color="default"
                    placeholder="Enter your email"
                    type="email" />
                  <Input
                    isRequired
                    variant="faded"
                    color="default"
                    placeholder="Enter your password"
                    type="password"
                  />
                  <p className="text-center text-small">
                    Need to create an account?{" "}
                    <Link size="sm" onPress={() => setSelected("sign-up")}>
                      Sign up
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={handleLogin} color="primary" type="submit">
                      Login
                    </Button>
                  </div>
                </form>

                <Divider className="my-4" />

                <div className="flex justify-center items-center gap-4">
                  <GoogleBtn />
                </div>

              </Tab>
              <Tab key="sign-up" title="Sign up">
                <form className="flex flex-col gap-4 h-[300px]">
                  <Input isRequired label="Name" placeholder="Enter your name" type="password" />
                  <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                  />
                  <p className="text-center text-small">
                    Already have an account?{" "}
                    <Link size="sm" onPress={() => setSelected("login")}>
                      Login
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={handleSignUp} color="primary" type="submit">
                      Sign up
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </main>
    </Structure>
  )
}