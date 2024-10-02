"use client";

import { Airport, BaseStepProps, FlightActivity } from '@app/models';
import { Divider } from '@nextui-org/react';
import { Input } from 'components/Form';
import { StepTitle } from 'components/Steps/StepTitle';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { getAirportsByCoordinates, getAirportsByCountry } from 'lib/airports/airports';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { BiSolidPlaneAlt } from 'react-icons/bi';

interface SelectPlaneProps {
  type: ('arrival' | 'departure');
  className: string;
  placeholder: string;
  onChange: any;
  current?: Airport;
  options: Airport[];
}

export function SelectPlane(props: BaseStepProps<FlightActivity>) {
  // State
  const [arrivalAirports, setArrivalAirports] = useState<Airport[]>([]);
  const [departureAirports, setDepartureAirports] = useState<Airport[]>([]);

  // Latitude and longitude
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  // Translations
  const t = useTranslations();

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
      .then(setArrivalAirports)
      .catch(console.error);

    // Get airports by country
    getAirportsByCountry(data?.trip.country.codes ?? [])
      .then(setDepartureAirports)
      .catch(console.error);
  }, [latitude, longitude]);


  // Plane Content
  const PlaneContent = ({ airport, props, onClick }: { airport: Airport, props: SelectPlaneProps, onClick?: any }) => (
    <div
      key={airport.id + props.type}
      onClick={onClick}
      className={
        `flex items-center py-2 px-4 gap-2 hover:bg-blue-light cursor-pointer rounded-md ${props.current?.id === airport.id ? "bg-blue-light" : ""}`
      }>

      {/* Icon */}
      <div className='flex items-center justify-center w-8'>
        <BiSolidPlaneAlt className="text-xl text-grey-extra-light mr-3" />
      </div>

      {/* Content */}
      <div className="flex-grow">
        <p className="font-semibold">{airport.municipality}, {airport.iso_country}</p>
        <p className="text-sm text-grey-light">
          {airport.name}
          {airport.iata_code ? ` (${airport.iata_code})` : ""} {/* Renderiza o código somente se ele existir */}
        </p>
      </div>
    </div>
  );

  // Input with options
  const PlaneInput = (props: SelectPlaneProps) => (
    <div className={`2lg:w-[500px] ${props.className}`}>
      <Input
        placeholder={props.placeholder}
        type='text'
        className='mb-2'
        handleChange={props.onChange}
      />

      <div className='flex flex-col max-h-60 overflow-y-auto rounded-md m-2'>
        {
          props.options.length > 0
            ? props.options.map((airport: Airport) => <PlaneContent onClick={() => props.onChange(airport)} key={airport.id} airport={airport} props={props} />)
            : <p className='text-center text-grey-light min-w-[400px]'>{t('noDataFound')}</p>
        }
      </div>

      {props.current &&
        <>
          <Divider className='mt-2' />
          <div className='flex items-center justify-center p-4'>
            <PlaneContent airport={props.current} props={props} />
          </div>
        </>
      }
    </div>
  );

  // Render
  return (
    <>
      <StepTitle title='defineYourRoute' />

      <div className='flex flex-col gap-4 2lg:flex-row'>
        <PlaneInput
          type='arrival'
          options={arrivalAirports}
          current={props.state?.arrival}
          className='2lg:border-r-1 2lg:pr-4 border-r-grey-light'
          placeholder='search'
          onChange={setSelectedArrival}
        />

        <PlaneInput
          type='departure'
          options={departureAirports}
          current={props.state?.departure}
          className='2lg:border-0 border-t-1 pt-4 2lg:p-0 border-l-grey-light'
          placeholder='search'
          onChange={setSelectedDeparture}
        />
      </div>
    </>

  );
}
