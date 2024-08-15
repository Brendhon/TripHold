"use client";

import { StepsStructureProps } from "@app/models";
import { StepProgressBar } from "components";
import { useRouter } from "next/navigation";
import { cloneElement, useState } from "react";
import { ActionsSection } from "./ActionsSection";

export default function StepsStructure(props: StepsStructureProps) {
  // State
  const [currentStep, setCurrentStep] = useState(1);

  // Router
  const router = useRouter();

  // Get children as array
  let children = Array.isArray(props.children) ? props.children : [props.children];

  // Add setform and form to children props
  children = children.map((child, index) => cloneElement(child, { setstate: props.setform, state: props.form, key: index }));

  // Get number of steps
  const steps = children.length;

  // Handle next step
  const handleNextStep = () => currentStep == steps ? props.onfinish() : setCurrentStep(currentStep + 1);

  // Handle back step
  const handleBackStep = () => currentStep === 1 ? router.back() : setCurrentStep(currentStep - 1);

  // Render home page
  return (
    <main className={`flex flex-col items-center justify-center ${props.className}`}>
      {/* Progress bar */}
      <StepProgressBar currentStep={currentStep} numberOfSteps={steps} />
    
      {/* Break line */}
      <br />

      <div className="flex flex-col gap-6 bg-blue-regular p-5 rounded-md">
        {/* Children - Show firs child if current step is 1, show second child if current step is 2, and so on */}
        {children.map((child, index) => <div key={index} className={currentStep === index + 1 ? '' : 'hidden'}> {child} </div>)}

        {/* Actions */}
        <ActionsSection back={handleBackStep} confirm={handleNextStep} />
      </div>

    </main>
  )
}