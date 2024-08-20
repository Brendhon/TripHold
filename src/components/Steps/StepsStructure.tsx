"use client";

import { StepsStructureProps } from "@app/models";
import { StepProgressBar } from "components";
import { useRouter } from "next/navigation";
import { cloneElement, useState } from "react";
import { ActionsSection } from "./ActionsSection";
import { AnimatePresence, motion } from "framer-motion"

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
  children = children.map((child, index) => cloneElement(child, { setstate: props.setform, state: props.form, key: index }));

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
  const handleBackStep = () => currentStep === 1 ? router.back() : setCurrentStep(currentStep - 1);

  // Render home page
  return (
    <main className={`flex flex-col items-center justify-center ${props.className}`}>
      {/* Progress bar */}
      <StepProgressBar currentStep={currentStep} numberOfSteps={steps} />

      {/* Break line */}
      <br />

      {/* Container for steps */}
      <div className="relative flex flex-col gap-6 bg-blue-regular p-5 rounded-md">
        <AnimatePresence mode="wait">
          {children.map((child, index) => (
            currentStep === index + 1 && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {child}
              </motion.div>
            )
          ))}
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