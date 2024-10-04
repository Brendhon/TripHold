"use client";

import StepsStructure from 'components/Steps/StepsStructure';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { useEffect } from 'react';
import { SelectOthers } from './SelectOthers';
import { OthersSummary } from './OthersSummary';
import { ActivityDesc } from '../../ActivityDesc';
import { SelectPeriod } from 'components/Steps/SelectPeriod/SelectPeriod';
import { showErrorNotifier, showSuccessNotifier } from '@utils/notifier';
import { ActivityTransportType, ActivityType, OthersTransportActivity } from '@app/models';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from '@utils/forms';
import { createActivity } from 'lib/firebase/firestore/activity';

export function OthersSteps() {
  // Form state
  const { form, setForm } = useForm<OthersTransportActivity>();

  // Get data from activity props context
  const { data } = useActivityCreationData();

  // Route
  const route = useRouter();

  // Translations
  const t = useTranslations('Toast');

  // Handle creation
  const handleCreation = async () => {
    // Create activity
    const activity: OthersTransportActivity = {
      tripId: data?.trip.id!,
      arrival: form.arrival!,
      departure: form.departure!,
      startDate: form.startDate!,
      endDate: form.endDate!,
      description: form.description ?? '',
      type: ActivityType.Transport,
      subType: data?.transportType! as ActivityTransportType,
      pin: {
        latitude: form.arrival?.latitude!,
        longitude: form.arrival?.longitude!,
      },
    };

    console.log(activity);

    // // Create flight activity
    // return createActivity(activity)
    //   .then(handleSuccess)
    //   .catch(handleError);
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
    console.log(data);
  }

  // Set start date
  useEffect(() => initStartDate(), [data]);

  // Render
  return (
    <StepsStructure onfinish={handleCreation} form={form} setform={setForm}>
      <SelectOthers />
      <SelectPeriod
        showTime
        title='activityTimeChoose'
        requiredFields={['startDate', 'endDate']}
        startDatePlaceholder='selectDepartureDate'
        endDatePlaceholder='selectArrivalDate'
      />
      <ActivityDesc />
      <OthersSummary />
    </StepsStructure>
  );
}
