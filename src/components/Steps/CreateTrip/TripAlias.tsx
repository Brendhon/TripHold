"use client";

import { BaseStepProps, Trip } from '@app/models';
import { Input } from 'components/Form';
import { StepTitle } from '../StepTitle';

export function TripAlias(props: BaseStepProps<Trip>) {
  // Handle change
  const handleChange = (e: any) => {
    console.log(e.target.value);
    props.setstate!({ ...props.state!, alias: e.target.value })
  };

  // Render
  return (
    <div className={props.className}>
      <StepTitle title='alias' />
      <Input handleChange={handleChange} controller={props.state?.alias} type="text" placeholder="alias" />
    </div>
  )
}
