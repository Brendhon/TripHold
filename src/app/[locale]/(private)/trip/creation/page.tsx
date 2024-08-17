"use client";

import { Trip } from "@app/models";
import { useForm } from "@utils/forms";
import { showErrorNotifier, showSuccessNotifier } from "@utils/notifier";
import { useUserId } from "@utils/session";
import { CountrySelection, SelectPeriod, TripSummary } from "components";
import StepsStructure from "components/Steps/StepsStructure";
import { createTrip } from "lib/firebase/firestore/trip";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function TripCreation() {
  // Form state
  const { form, setForm } = useForm<Trip>();

  // Translations
  const t = useTranslations("Toast");

  // Router
  const router = useRouter();

  // Get user ID
  const userId = useUserId();

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

  // Render home page
  return (
    <StepsStructure onfinish={handleCreation} form={form} setform={setForm}>
      <CountrySelection requiredFields={['country']} className="md:min-w-[500px]" />
      <SelectPeriod requiredFields={['startDate', 'endDate']} />
      <TripSummary />
    </StepsStructure>
  )
}