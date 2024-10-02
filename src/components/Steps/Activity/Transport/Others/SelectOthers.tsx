"use client";


import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export function SelectOthers() {
  // Locale
  const locale = useLocale();

  // Get data from activity props context
  const { data } = useActivityCreationData();

  useEffect(() => {
    console.log('SelectOthers', data);
  }, [data]);

  // Render
  return (
    <h1>Others</h1>
  );
}
