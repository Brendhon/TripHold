"use client";

import { Button, Card, CardBody, CardFooter, Spinner } from "@nextui-org/react";
import { getServiceTerms } from "lib/terms/terms";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Terms() {
  // State
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Use locale
  const locale = useLocale();

  // Router
  const router = useRouter();

  // Translation
  const t = useTranslations("Button");

  useEffect(() => {
    // Get airports in public folder
    getServiceTerms(locale).then((data) => {
      setTitle(data.title);
      setDesc(data.desc);
      setLoading(false);
    }).catch((error) => console.log(error));
  }, [locale]);

  // Terms
  const ServiceTerms = () => {
    return (
      <Card className="gap-4 p-4 max-w-[1200px]">
        <CardBody className="flex gap-3 flex-col">
          <h1 className="text-2xl font-semibold flex text-center justify-center" >{title}</h1>
          <p dangerouslySetInnerHTML={{ __html: desc }}></p>
        </CardBody>

        <CardFooter>
          <Button onClick={() => router.back()} size="md">
            {t('back')}
          </Button>
        </CardFooter>

      </Card >
    )
  }

  // Render
  return loading ? <Spinner size="lg" /> : <ServiceTerms />
}