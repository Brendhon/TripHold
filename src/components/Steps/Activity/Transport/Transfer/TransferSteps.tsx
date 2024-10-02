"use client";

import StepsStructure from 'components/Steps/StepsStructure';
import { useActivityCreationData } from 'context/ActivityCreationDataContext';
import { useEffect } from 'react';
import { SelectTransfer } from './SelectTransfer';

export function TransferSteps() {
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
      <SelectTransfer />
      <SelectTransfer />
    </StepsStructure>
  );
}
