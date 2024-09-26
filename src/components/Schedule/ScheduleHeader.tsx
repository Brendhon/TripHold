"use client";

import { TripDayRange } from "@app/models";
import { Button } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

interface SelectGroupProps {
  ranges: TripDayRange[];
  selectGroup: (group: TripDayRange) => void;
}

type NextBackVisibility = 'hidden' | 'visible';

/**
 * Trip Schedule
 */
export function ScheduleHeader(props?: SelectGroupProps) {
  // State
  const [selectedRange, _setSelectedRange] = useState<TripDayRange>();
  const [visible, setVisible] = useState<NextBackVisibility>('hidden');

  // Locale
  const locale = useLocale();

  // Translations
  const t = useTranslations("TripDetails.schedule");

  // Set selected group
  const setSelectedGroup = (group?: TripDayRange) => {
    setNextBackVisibility();
    _setSelectedRange(group);
    if (group) props?.selectGroup(group);
  }

  // Set next and back visibility
  const setNextBackVisibility = () => {
    const rangeLength = props?.ranges?.length ?? 0;
    setVisible(rangeLength > 1 ? 'visible' : 'hidden');
  }

  // Set selected group
  useEffect(() => setSelectedGroup(props?.ranges[0]), [props?.ranges]);

  // Get day title
  const getDayTitle = () => {
    // Get in format like as August 1 - September 1 2021
    const start = new Date(selectedRange!.startDate);

    // Get in format like as August 1 - September 1 2021
    const end = new Date(selectedRange!.endDate);

    // Check if are in the same month
    return start.getMonth() === end.getMonth()
      ? start.toLocaleDateString(locale, { day: 'numeric' }) + " - " + end.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
      : start.toLocaleDateString(locale, { day: 'numeric', month: 'long' }) + " - " + end.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Handle add button click
  const handleAddClick = () => {
    console.log('Add button clicked');
  };

  // Const DateTitle
  const DateTitle = ({ className }: { className?: string }) => {
    return (
      <span className={`flex items-center text-xl md:text-2xl text-grey-extra-light ${className}`}>
        {getDayTitle()}
      </span>
    )
  }

  // Render
  return (
    <>
      {
        selectedRange &&
        <div className="flex flex-col-reverse md:flex-row md:items-center w-full justify-between mb-6 gap-4">

          {/* Next and back buttons */}
          <div className={`flex items-center gap-4 justify-between bg-grey-medium p-3 rounded-lg`}>
            <Button
              isIconOnly
              className={visible}
              onClick={() => setSelectedGroup(props?.ranges[selectedRange!.id - 1])}
              isDisabled={selectedRange?.id === 0}>
              <IoMdArrowRoundBack size={24} />
            </Button>
            <DateTitle />
            <Button
              isIconOnly
              className={visible}
              onClick={() => setSelectedGroup(props?.ranges[selectedRange!.id + 1])}
              isDisabled={selectedRange?.id === props?.ranges.length! - 1}>
              <IoMdArrowRoundForward size={24} />
            </Button>
          </div>

          {/* Title - Dates */}
          {/* <DateTitle className="hidden md:inline-flex" /> */}

          {/* Add button */}
          <Button
            variant="solid"
            size="lg"
            color="primary"
            onClick={() => handleAddClick()}>
            {t('add')}
          </Button>
        </div>
      }
    </>
  )
}