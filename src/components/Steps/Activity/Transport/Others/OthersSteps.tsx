"use client";

import StepsStructure from 'components/Steps/StepsStructure';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { useEffect } from 'react';
import { SelectOthers } from './SelectOthers';

export function OthersSteps() {
  // Get data from activity props context
  const { data } = useActivityCreationData();

  // Handle creation
  const handleCreation = async () => {
    console.log('Creating activity...');
  };

  useEffect(() => {
    console.log('SelectOthers', data);
  }, [data]);

  // Render
  return (
    <StepsStructure onfinish={handleCreation}>
      <SelectOthers />
      <SelectOthers />
    </StepsStructure>
  );
}
