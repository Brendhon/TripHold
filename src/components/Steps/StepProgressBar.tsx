"use client";

import { StepProgressBarProps } from "@app/models";
import { Progress } from "@nextui-org/react";
import { Fragment } from "react";

export const StepProgressBar = (props: StepProgressBarProps) => {
  // Crete function to calculate progress percentage
  const progress = (progressStep: number) => progressStep < props.currentStep ? 100 : 0

  // Render
  return (
    <nav className="flex justify-center items-center gap-2">
      {Array
        .from({ length: props.numberOfSteps }) // Create an array of the length of the number of steps
        .map((_, index: number) => (
          <Fragment key={index}>

            {/* Circles */}
            <div
              className={
                `flex items-center justify-center w-7 h-7 rounded-full border-2 transition duration-300 delay-150
               ${index + 1 <= props.currentStep ? 'bg-purple-semi-bold border-purple-bold' : 'bg-grey-extra-light border-blue-light'}`
              }>
            </div>

            {/* Lines */}
            {index < props.numberOfSteps - 1 && (
              <Progress
                aria-label={"Step " + index}
                value={progress(index + 1)}
                size="sm"
                className="w-40"
              />
            )}

          </Fragment>
        ))}
    </nav>
  );
};