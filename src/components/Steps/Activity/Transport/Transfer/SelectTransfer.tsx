"use client";

import { Activity, Airport, BaseStepProps, TransferActivity, TripAdvisorActivitySearch } from '@app/models';
import { isFlightActivity } from '@utils/common';
import { StepTitle } from 'components/Steps/StepTitle';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { getHotels } from 'lib/activity/activity';
import { getAirportsByCoordinates } from 'lib/airports/airports';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { HotelInput } from '../HotelInput';
import { PlaneInput } from '../PlaneInput';

export function SelectTransfer(props: BaseStepProps<TransferActivity>) {
  // State
  const [airports, setAirports] = useState<Airport[]>([]);
  const [hotels, setHotels] = useState<TripAdvisorActivitySearch[]>([]);

  // Last activity
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [lastActivity, setLastActivity] = useState<Activity>();

  // Is arrival and departure airport or hotel
  const [arrivalType, setArrivalType] = useState<'airport' | 'hotel'>('airport');
  const [departureType, setDepartureType] = useState<'airport' | 'hotel'>('airport');

  // Set selected arrival
  const setSelectedArrival = (data: Airport | TripAdvisorActivitySearch) => props.setstate!({ ...props.state!, arrival: data });

  // Set selected departure
  const setSelectedDeparture = (data: Airport | TripAdvisorActivitySearch) => props.setstate!({ ...props.state!, departure: data });

  // Get data from activity props context
  const { data } = useActivityCreationData();

  // Use locale
  const locale = useLocale()

  // Set latitude and longitude
  useEffect(() => {
    setLatitude(data?.pin?.latitude);
    setLongitude(data?.pin?.longitude);
    setLastActivity(data?.lastActivity);
  }, [data]);

  // Fetch airports
  useEffect(() => {
    // Check if latitude and longitude exists
    if (!latitude || !longitude || !lastActivity) return;

    // Check if last activity is flight
    if (isFlightActivity(lastActivity)) {
      setDepartureType('airport');
      setArrivalType('hotel');
      setSelectedDeparture(lastActivity.arrival);
    } else {
      setDepartureType('hotel');
      setArrivalType('airport');
    }

    // Get airports by country
    getHotels('hotels', locale, { latitude, longitude })
      .then(setHotels)
      .catch(console.error);

    // Get airports by coordinates
    getAirportsByCoordinates(latitude, longitude)
      .then(setAirports)
      .catch(console.error);
  }, [latitude, longitude]);

  // Render
  return (
    <>
      <StepTitle title='defineYourRoute' />

      <div className='flex flex-col gap-4 2lg:flex-row'>
        {
          departureType === 'airport'
            ? <PlaneInput
              type='departure'
              options={airports}
              current={props.state?.departure as Airport}
              className='2lg:border-r-1 2lg:pr-4 border-r-grey-light'
              placeholder='selectDeparturePlace'
              onChange={setSelectedDeparture}
            />
            : <HotelInput
              type='departure'
              options={hotels}
              current={props.state?.departure as TripAdvisorActivitySearch}
              className='2lg:border-r-1 2lg:pr-4 border-r-grey-light'
              placeholder='selectDeparturePlace'
              onChange={setSelectedDeparture}
            />
        }

        {
          arrivalType === 'airport'
            ? <PlaneInput
              type='arrival'
              options={airports}
              current={props.state?.arrival as Airport}
              className='2lg:border-0 border-t-1 pt-4 2lg:p-0 border-l-grey-light'
              placeholder='selectArrivalPlace'
              onChange={setSelectedArrival}
            />
            : <HotelInput
              type='arrival'
              options={hotels}
              current={props.state?.arrival as TripAdvisorActivitySearch}
              className='2lg:border-0 border-t-1 pt-4 2lg:p-0 border-l-grey-light'
              placeholder='selectArrivalPlace'
              onChange={setSelectedArrival}
            />
        }

      </div>
    </>

  );
}
