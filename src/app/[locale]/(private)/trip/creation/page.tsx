"use client";

import { Trip } from "@app/models";
import { Button } from "@nextui-org/react";
import { useForm } from "@utils/forms";
import { showErrorNotifier, showSuccessNotifier } from "@utils/notifier";
import { useUserData, useUserId } from "@utils/session";
import { CountrySelection, SelectPeriod, TripAlias, TripSummary } from "components";
import StepsStructure from "components/Steps/StepsStructure";
import { sendEmailVerification } from "lib/email/user";
import { createTrip } from "lib/firebase/firestore/trip";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TripCreation() {
  // Form state
  const { form, setForm } = useForm<Trip>();

  // States
  const [errors, setErrors] = useState<('email' | 'zipCode')[]>([]);
  const [sending, setSending] = useState(false);

  // Translations
  const t = useTranslations("Toast");
  const tModal = useTranslations('Modal');
  const tButton = useTranslations('Button');

  // User id
  const user = useUserData();

  // Locale
  const locale = useLocale();

  // Router
  const router = useRouter();

  // Get user ID
  const userId = useUserId();

  // Use effect to check incomplete profile
  useEffect(() => {
    // Check if user exists
    if (!user?.id) return;

    // Check if email is verified
    if (user.provider == 'email' && !user.emailVerified) setErrors(prev => [...prev, 'email']);

    // Check if zip code is filled
    if (!user?.zipCode) setErrors(prev => [...prev, 'zipCode']);
  }, [user])

  // Handle creation
  const handleCreation = async () => {
    try {
      await createTrip({ ...form, userIds: [userId] });
      showSuccessNotifier(t, "trip.create");
      router.push('/home');
    } catch (error) {
      console.error(error);
      showErrorNotifier(t, "trip.create");
    }
  };

  // Handle email confirmation
  const handleEmailConfirmation = async () => {
    // Check if email exists
    if (!user?.id) return;

    // Set sending
    setSending(true);

    // Send email verification
    await sendEmailVerification(user.id, user.name, user.email, locale)
      .then(() => showSuccessNotifier(t, "email.resend"))
      .catch(() => showErrorNotifier(t, "email.resend"));

    // Set sending
    setSending(false);
  }

  // On finish
  const onfinish = () => errors.includes('zipCode') ? router.push('/profile') : router.push('/home');

  // Title
  const Title = ({title}: {title: string}) => {
    return (
      <h1 className="text-xl font-semibold text-center flex justify-center mb-4">{title}</h1>
    )
  }

  // Zip code example
  const ZipCode = () => {
    return (
      <>
        <Title title={tModal(`title.incompleteProfile`)} />
        <p className="text-md mb-4">{tModal(`message.incompleteProfileCep`)}</p>
        <Image
          src="/cep-exemple.gif"
          alt="ZIP Code"
          className="rounded-sm"
          width={900}
          height="0"
          style={{ height: 'auto' }}
        />
      </>
    )
  }

  // Email example
  const Email = () => {
    return (
      <div className="max-w-[500px]">
        <Title title={tModal(`title.emailNotVerified`)} />
        <p className="text-sm mb-4 text-justify">{tModal(`message.incompleteProfileEmailValidation`)}</p>
        <div className="flex justify-center">
          <Button size="md" color="primary" onClick={handleEmailConfirmation} isLoading={sending}>
            {tButton(`resendEmail`)}
          </Button>
        </div>
      </div>
    )
  }

  // Render home page
  return (
    <>
      {errors.length == 0 ?
        (
          <StepsStructure onfinish={handleCreation} form={form} setform={setForm}>
            <CountrySelection requiredFields={['country']} className="md:min-w-[500px]" />
            <SelectPeriod requiredFields={['startDate', 'endDate']} />
            <TripAlias className="md:min-w-[300px]" />
            <TripSummary />
          </StepsStructure>
        )
        :
        (
          <StepsStructure
            onfinish={onfinish}>
            {errors.includes('email') && <Email />}
            {errors.includes('zipCode') && <ZipCode />}
          </StepsStructure>
        )
      }
    </>

  )
}