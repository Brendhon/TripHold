"use client";


import { BaseStepProps, OthersTransportActivity } from '@app/models';
import { Divider } from '@nextui-org/react';
import { ActivityAddress } from 'components/Steps/Activity/ActivityAddress';
import { StepTitle } from 'components/Steps/StepTitle';
import { useEffect, useState } from 'react';

export function SelectAddress(props: BaseStepProps<OthersTransportActivity>) {
  // State
  const [isDepartureSet, setIsDepartureSet] = useState(false);
  const [isArrivalSet, setIsArrivalSet] = useState(false);

  // Listening to changes in the state
  useEffect(() => {
    if (!isDepartureSet) props.setstate!({ ...props.state!, departure: undefined });
  }, [isDepartureSet]);

  // Listening to changes in the state
  useEffect(() => {
    if (!isArrivalSet) props.setstate!({ ...props.state!, arrival: undefined });
  }, [isArrivalSet]);


  useEffect(() => {
    // console.log('SelectOthers', props.state);
  }, [props.state]);

  // Render
  return (
    <>
      <StepTitle title='defineYourRoute' />

      <div className='flex flex-col gap-2'>
        <ActivityAddress
          title='departure'
          isSubmitEnabled={(enable) => setIsDepartureSet(enable)}
          requiredFields={['country', 'state', 'city', 'postalcode', 'street1']}
          state={props.state?.departure}
          setstate={(data) => props.setstate!({ ...props.state!, departure: data })}
        />

        <Divider />

        <ActivityAddress
          title='arrival'
          isSubmitEnabled={(enable) => setIsArrivalSet(enable)}
          requiredFields={['country', 'state', 'city', 'postalcode', 'street1']}
          state={props.state?.arrival}
          setstate={(data) => props.setstate!({ ...props.state!, arrival: data })}
        />
      </div>
    </>
  );
}
