"use client";

import { BaseStepProps } from '@app/models';
import { Textarea } from 'components/Form';
import { StepTitle } from '../StepTitle';

export function ActivityDesc(props: BaseStepProps<any>) {
  // Handle change
  const handleChange = (e: any) => props.setstate!({ ...props.state!, description: e.target.value });

  // Render
  return (
    <div className={props.className}>
      <StepTitle title='anythingElseToSayAboutActivity' />
      <Textarea handleChange={handleChange} maxLength={35} controller={props.state?.description} placeholder="optionalDescription" />
    </div>
  )
}
