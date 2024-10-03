"use client";

import { FlightActivity } from '@app/models';
import { useForm } from '@utils/forms';
import StepsStructure from 'components/Steps/StepsStructure';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { useEffect } from 'react';
import { SelectPlane } from './SelectPlane';
import { SelectPeriod } from 'components/Steps/SelectPeriod/SelectPeriod';
import { ActivityDesc } from '../../ActivityDesc';
import { FlightSummary } from './FlightSummary';

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
    // Set start date
    form.startDate = data?.date;
  }, [data]);

  // Render
  return (
    <StepsStructure onfinish={handleCreation} form={form} setform={setForm}>
      <SelectPlane requiredFields={['departure', 'arrival']} />
      <SelectPeriod
        showTime
        title='activityTimeChoose'
        requiredFields={['startDate', 'endDate']}
        startDatePlaceholder='selectDepartureDate'
        endDatePlaceholder='selectArrivalDate'
      />
      <ActivityDesc />
      <FlightSummary />
    </StepsStructure>
  );
}
