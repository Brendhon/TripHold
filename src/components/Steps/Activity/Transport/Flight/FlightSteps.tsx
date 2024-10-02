"use client";

import StepsStructure from 'components/Steps/StepsStructure';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { useEffect } from 'react';
import { SelectPlane } from './SelectPlane';

export function FlightSteps() {
  // Get data from activity props context
  const { data } = useActivityCreationData();

  // Handle creation
  const handleCreation = async () => {
    console.log('Creating activity...');
  };

  useEffect(() => {
    console.log('SelectTransfer', data);
  }, [data]);

  // Render
  return (
    <StepsStructure onfinish={handleCreation}>
      <SelectPlane />
      <SelectPlane />
    </StepsStructure>
  );
}
