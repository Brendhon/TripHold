"use client";

import { CDatePickerProps } from "@app/models";
import { getDateFormat, getDateTimeFormat } from "@utils/dates";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import DefaultDatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { Input } from "./Input";
import { AnimatePresence, motion } from "framer-motion"

const MyContainer = ({ className, children }: { className: string, children: React.ReactNode }) => {
  return (
    <div className="bg-blue-regular flex border-1 rounded-md border-grey-light">
      <CalendarContainer className={className}>
        {children}
      </CalendarContainer>
    </div>
  );
};

/**
 * Custom DatePicker
 */
export function DatePicker(props: CDatePickerProps) {
  // Get locale
  const locale = useLocale();

  // State open
  const [open, setOpen] = useState(false);

  // Handle on change
  const handleChange = (newDate: Date) => {
    console.log(newDate)
    props.handleChange && props.handleChange(newDate)
    if (!props.showTime) setOpen(false);
  }

  // Ref for date-picker div
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Handle open
  const handleOpen = () => setOpen(props.disabled ? false : true)

  // Close the calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node))
        setOpen(false);
    };

    // Add event listener
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Render
  return (
    <div
      ref={datePickerRef}
      className="relative">
      <Input
        readOnly
        variant="bordered"
        placeholder={props.placeholder ?? 'date'}
        isDisabled={props.disabled}
        type="text"
        controller={props.showTime ? props.date?.toLocaleString(locale) : props.date?.toLocaleDateString(locale)}
        onClick={handleOpen}
        className={`cursor-pointer min-w-64 ${props.inputProps?.className ?? ''}`}
        startContent={<FaCalendarAlt onClick={handleOpen} className="cursor-pointer" />}
        {...props.inputProps}
      />
      <AnimatePresence mode="wait">
        {open && <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-12 left-0 z-10">

          {/* Date picker */}
          <DefaultDatePicker
            inline
            disabled={props.disabled}
            onChange={(date: any) => handleChange(date)}
            locale={locale}
            calendarClassName="date-picker-calendar"
            calendarContainer={MyContainer}
            selected={props.date}
            icon={<FaCalendarAlt />}
            dateFormat={getDateFormat(locale)}
            {...props.datePickerProps}
          />

          {/* Time selector */}
          {props.showTime && <div className="flex justify-center">
            <DefaultDatePicker
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              locale={locale}
              timeCaption="teste"
              dateFormat={getDateTimeFormat(locale)}
              selected={props.date}
              onChange={(date: any) => handleChange(date)}
            />
          </div>}
        </motion.div>}
      </AnimatePresence>
    </div>
  )
}