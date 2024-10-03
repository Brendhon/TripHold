"use client";

import { ActivityTransportType, ActivityType, TransferActivity } from '@app/models';
import { useForm } from '@utils/forms';
import { showErrorNotifier, showSuccessNotifier } from '@utils/notifier';
import { SelectPeriod } from 'components/Steps/SelectPeriod/SelectPeriod';
import StepsStructure from 'components/Steps/StepsStructure';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { createActivity } from 'lib/firebase/firestore/activity';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ActivityDesc } from '../../ActivityDesc';
import { TransferSummary } from './TransferSummary';

export function TransferSteps() {
  // Form state
  const { form, setForm } = useForm<TransferActivity>();

  // Get data from activity props context
  const { data } = useActivityCreationData();

  // Route
  const route = useRouter();

  // Translations
  const t = useTranslations('Toast');

  // Handle creation
  const handleCreation = async () => {
    // Create activity
    const activity: TransferActivity = {
      tripId: data?.trip.id!,
      arrival: form.arrival!,
      departure: form.departure!,
      startDate: form.startDate!,
      endDate: form.endDate!,
      description: form.description ?? '',
      type: ActivityType.Transport,
      subType: ActivityTransportType.Transfer,
      pin: {
        latitude: form.arrival?.latitude!,
        longitude: form.arrival?.longitude!,
      },
    };

    // Create flight activity
    createActivity(activity)
      .then(handleSuccess)
      .catch(handleError);
  };

  // Handle success
  const handleSuccess = () => {
    showSuccessNotifier(t, 'activity.create');
    route.push(`/trip/${data?.trip.id}`);
  }

  // handle error
  const handleError = (error: any) => {
    console.error(error);
    showErrorNotifier(t, 'activity.create');
  }

  // Set start date
  const initStartDate = () => {
    form.startDate = data?.date ?? new Date();
  }

  // Set start date
  useEffect(() => initStartDate(), [data]);

  // Render
  return (
    <StepsStructure onfinish={handleCreation} form={form} setform={setForm}>
      <SelectPeriod
        showTime
        title='activityTimeChoose'
        requiredFields={['startDate', 'endDate']}
        startDatePlaceholder='selectDepartureDate'
        endDatePlaceholder='selectArrivalDate'
      />
      <ActivityDesc />
      <TransferSummary />
    </StepsStructure>
  );
}
