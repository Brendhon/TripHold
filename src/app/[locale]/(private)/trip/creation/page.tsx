"use client";

import { StepProgressBar } from "components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TripCreation() {
  // State
  const [currentStep, setCurrentStep] = useState(1);

  // Router
  const router = useRouter();

  // Number of steps
  const numberOfSteps = 3;

  // Handle next step
  const handleNextStep = () => currentStep !== numberOfSteps && setCurrentStep(currentStep + 1);

  // Handle back step
  const handleBackStep = () => currentStep === 1 ? router.back() : setCurrentStep(currentStep - 1);


  // Render home page
  return (
    <>
      <StepProgressBar currentStep={currentStep} numberOfSteps={numberOfSteps} />

      <div className="flex items-center justify-center gap-2">
        <button onClick={handleNextStep}>Next</button>
        <button onClick={handleBackStep}>Back</button>
      </div>
    </>
  )
}