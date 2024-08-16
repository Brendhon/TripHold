"use client";

import { Trip } from "@app/models";
import { useForm } from "@utils/forms";
import { CountrySelection, SelectPeriod } from "components";
import StepsStructure from "components/Steps/StepsStructure";

export default function TripCreation() {
  // Form state
  const { form, setForm } = useForm<Trip>();

  // Handle creation
  const handleCreation = () => console.log('Trip created', form);

  // Render home page
  return (
    <StepsStructure onfinish={handleCreation} form={form} setform={setForm}>
      <CountrySelection className="md:min-w-[500px]" />
      <SelectPeriod />
    </StepsStructure>
  )
}