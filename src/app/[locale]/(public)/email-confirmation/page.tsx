"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import jwt from "jsonwebtoken";

export default function EmailConfirmation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Translations
  const tPage = useTranslations("EmailConfirmed");

  useEffect(() => {
    // Get token from URL query
    const query = new URLSearchParams(window.location.search);
    setToken(query.get("token"));

    console.log(token);

    // Simula o tempo de confirmação do email
    const timer = setTimeout(() => setLoading(false), 3000); // 3 segundos para a animação
    return () => clearTimeout(timer);
  }, []);

  // Get title
  const getTitle = () => {
    switch (true) {
      case error:
        return tPage("error");
      case loading:
        return tPage("inProgress");
      default:
        return tPage("title");
    }
  }

  // Get message
  const getMessage = () => {
    switch (true) {
      case error:
        return tPage("errorMessage");
      case loading:
        return tPage("inProgressMessage");
      default:
        return tPage("message");
    }
  }

  // Can show footer
  const canShowFooter = () => !loading && !error;

  // Render
  return (
    <Card className="gap-4 max-w-96 p-4">
      <CardHeader className="flex gap-3 flex-col">
        <h1 className="text-3xl">{getTitle()}</h1>

        <AnimatePresence>
          {loading ?
            <div role="status">
              <svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-grey-light fill-green-medium" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div> :
            <motion.div
              key="check"

              initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              {error ? <IoCloseCircle className="text-orange-regular" size={72} /> : <IoCheckmarkCircle className="text-green-medium" size={72} />}
            </motion.div>
          }
        </AnimatePresence>
      </CardHeader>
      <Divider />
      <CardBody className="flex gap-3 flex-col text-center">
        <p> {getMessage()} </p>
      </CardBody>
      {canShowFooter() &&
        <CardFooter className="flex gap-3 flex-col">
          <Button color="primary" href="/login"> {tPage("login")} </Button>
        </CardFooter>
      }
    </Card >
  )
}