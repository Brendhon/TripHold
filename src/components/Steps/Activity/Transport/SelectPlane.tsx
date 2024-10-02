"use client";

import { ActivityProps } from '@app/models';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';


export function SelectPlane(props: ActivityProps) {
  // Locale
  const locale = useLocale();

  useEffect(() => {
    console.log('SelectPlane', props);
  }, [props.pin]);

  // Render
  return (
    <h1>Plane</h1>
  );
}
