"use client";

import { StepsStructureProps } from "@app/models";
import { AnimatedDiv } from "components/Common";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cloneElement, useState } from "react";
import { ActionsSection } from "./ActionsSection";
import { StepProgressBar } from "./StepProgressBar";

export default function StepsStructure(props: StepsStructureProps) {
  // State
  const [currentStep, setCurrentStep] = useState(1);

  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Router
  const router = useRouter();

  // Get children as array
  let children = Array.isArray(props.children) ? props.children : [props.children];

  // Add setform and form to children props
  children = children
    .filter((child) => child)
    .map((child, index) => cloneElement(child, { setstate: props.setform, state: props.form, key: index }));

  // Check if has required fields in children
  const requiredFields = children
    .map((child) => child.props.requiredFields ? child.props.requiredFields : [])
    .filter((child) => child);

  // Get number of steps
  const steps = children.length;

  // Check if all required fields are filled
  const isSubmitDisabled = () => {
    // Check if has required fields
    if (!requiredFields.length) return false;

    // Get required fields for current step
    const fields = requiredFields[currentStep - 1];

    // Check if has required fields
    if (!fields?.length) return false;

    // Check if all required fields are filled
    return fields.some((field: string) => !props.form[field]);
  }

  // Handle next step
  const handleNextStep = async () => {
    if (currentStep == steps) {
      try {
        setIsLoading(true);
        await props.onfinish();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else setCurrentStep(currentStep + 1);
  }

  // Handle back step
  const handleBackStep = () => currentStep === 1
    ? !!props.goBack ? props.goBack() : router.back()
    : setCurrentStep(currentStep - 1);

  // Render home page
  return (
    <main className={`flex flex-col items-center justify-center ${props.className}`}>
      {/* Progress bar */}
      {
        steps > 1 &&
        <StepProgressBar currentStep={currentStep} numberOfSteps={steps} />
      }

      {/* Break line */}
      {!props.hideBreakLine && <br />}

      {/* Container for steps */}
      <div className="relative flex flex-col gap-6 bg-blue-regular p-5 rounded-md">
        {/* Steps */}
        <AnimatePresence mode="wait">
          {props.titles && <h1 className="text-xl font-semibold text-center flex justify-center">{props.titles[currentStep - 1]}</h1>}
          {children.map((child, index) => currentStep === index + 1 && <AnimatedDiv key={index}> {child} </AnimatedDiv>)}
        </AnimatePresence>

        {/* Actions */}
        <ActionsSection
          back={handleBackStep}
          confirm={handleNextStep}
          isLoading={isLoading}
          isConfirmDisabled={isSubmitDisabled()}
        />
      </div>
    </main>
  );
}