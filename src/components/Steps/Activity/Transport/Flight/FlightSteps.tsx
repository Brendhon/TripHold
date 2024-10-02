"use client";

import { FlightActivity } from '@app/models';
import { useForm } from '@utils/forms';
import StepsStructure from 'components/Steps/StepsStructure';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { useEffect } from 'react';
import { SelectPlane } from './SelectPlane';

export function FlightSteps() {
  // Form state
  const { form, setForm } = useForm<FlightActivity>();

  // Get data from activity props context
  const { data } = useActivityCreationData();

  // Handle creation
  const handleCreation = async () => {
    console.log('Creating activity...', form);
  };

  useEffect(() => {
    console.log('SelectTransfer', data);
  }, [data]);

  // Render
  return (
    <StepsStructure onfinish={handleCreation} form={form} setform={setForm}>
      <SelectPlane requiredFields={['departure', 'arrival']} />
    </StepsStructure>
  );
}
