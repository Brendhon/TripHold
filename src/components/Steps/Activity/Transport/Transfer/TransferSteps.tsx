"use client";

import { ActivityTransportType, ActivityType, TransferActivity } from '@app/models';
import { useForm } from '@utils/forms';
import { showErrorNotifier, showSuccessNotifier } from '@utils/notifier';
import { SelectPeriod } from 'components/Steps/SelectPeriod/SelectPeriod';
import StepsStructure from 'components/Steps/StepsStructure';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { createActivity } from 'lib/firebase/firestore/activity';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ActivityDesc } from '../../ActivityDesc';
import { TransferSummary } from './TransferSummary';
import { SelectTransfer } from './SelectTransfer';
import { getActivityDetail } from 'lib/activity/activity';
import { isAirport } from '@utils/common';

export function TransferSteps() {
  // Form state
  const { form, setForm } = useForm<TransferActivity>();

  // Get data from activity props context
  const { data } = useActivityCreationData();

  // Route
  const route = useRouter();

  // Locale
  const locale = useLocale();

  // Translations
  const t = useTranslations('Toast');

  // Handle creation
  const handleCreation = async () => {

    // Check if form is valid
    if (!form.arrival || !form.departure || !form.startDate || !form.endDate) return;

    // Init activity
    let activity: TransferActivity = {
      tripId: data?.trip.id!,
      arrival: form.arrival!,
      departure: form.departure!,
      startDate: form.startDate!,
      endDate: form.endDate!,
      description: form.description ?? '',
      type: ActivityType.Transport,
      subType: ActivityTransportType.Transfer,
    }

    // Check if arrival is airport
    if (!isAirport(form.arrival)) {
      // Get arrival airport
      const arrival = await getActivityDetail(form.arrival.location_id, locale)

      // Create activity
      activity = {
        ...activity,
        pin: {
          latitude: +arrival.latitude,
          longitude: +arrival.longitude,
        },
      };
    } else {
      // Create activity
      activity = {
        ...activity,
        pin: {
          latitude: form.arrival.latitude,
          longitude: form.arrival.longitude,
        },
      };
    }

    // Create flight activity
    return createActivity(activity)
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
      <SelectTransfer />
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
