"use client";

import { Airport, BaseStepProps, FlightActivity } from '@app/models';
import { StepTitle } from 'components/Steps/StepTitle';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { getAirportsByCoordinates, getAirportsByCountry } from 'lib/airports/airports';
import { useEffect, useState } from 'react';
import { PlaneInput } from '../PlaneInput';

export function SelectPlane(props: BaseStepProps<FlightActivity>) {
  // State
  const [arrivalAirports, setArrivalAirports] = useState<Airport[]>([]);
  const [departureAirports, setDepartureAirports] = useState<Airport[]>([]);

  // Latitude and longitude
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  // Set selected arrival
  const setSelectedArrival = (airport: Airport) => props.setstate!({ ...props.state!, arrival: airport });

  // Set selected departure
  const setSelectedDeparture = (airport: Airport) => props.setstate!({ ...props.state!, departure: airport });

  // Get data from activity props context
  const { data } = useActivityCreationData();

  // Set latitude and longitude
  useEffect(() => {
    setLatitude(data?.pin?.latitude);
    setLongitude(data?.pin?.longitude);
  }, [data]);

  // Fetch airports
  useEffect(() => {
    // Check if latitude and longitude exists
    if (!latitude || !longitude) return;

    // Get airports by coordinates
    getAirportsByCoordinates(latitude, longitude)
      .then(setDepartureAirports)
      .catch(console.error);

    // Get airports by country
    getAirportsByCountry(data?.trip.country.codes ?? [])
      .then(setArrivalAirports)
      .catch(console.error);
  }, [latitude, longitude]);


  // Render
  return (
    <>
      <StepTitle title='defineYourRoute' />

      <div className='flex flex-col gap-4 2lg:flex-row'>
        <PlaneInput
          type='departure'
          options={departureAirports}
          current={props.state?.departure}
          className='2lg:border-r-1 2lg:pr-4 border-r-grey-light'
          placeholder='selectDeparturePlace'
          onChange={setSelectedDeparture}
        />

        <PlaneInput
          type='arrival'
          options={arrivalAirports}
          current={props.state?.arrival}
          className='2lg:border-0 border-t-1 pt-4 2lg:p-0 border-l-grey-light'
          placeholder='selectArrivalPlace'
          onChange={setSelectedArrival}
        />
      </div>
    </>

  );
}
