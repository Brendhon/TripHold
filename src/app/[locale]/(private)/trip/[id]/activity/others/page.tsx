"use client";

import StepsStructure from "components/Steps/StepsStructure";

export default function OthersCreation() {
  // Handle creation
  const handleCreation = async () => {
    console.log('Creating activity...');
  };

  // Render
  return (
    <StepsStructure onfinish={handleCreation}>
      <p>Hello World</p>
    </StepsStructure>
  )
}