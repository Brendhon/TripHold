"use client";

import { CDatePickerProps } from "@app/models";
import { getDateFormat } from "@utils/dates";
import { useLocale } from "next-intl";
import { useState } from "react";
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
    props.handleChange && props.handleChange(newDate)
    setOpen(false);
  }

  // Handle open
  const handleOpen = () => setOpen(props.disabled ? false : true)

  return (
    <div className="relative">
      <Input
        readOnly
        placeholder="date"
        isDisabled={props.disabled}
        type="text"
        controller={props.date?.toLocaleDateString(locale)}
        onClick={handleOpen}
        className={`cursor-pointer ${props.inputProps?.className ?? ''}`}
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
          <DefaultDatePicker
            inline
            disabled={props.disabled}
            onChange={(date: any) => handleChange(date)}
            locale={locale}
            onClickOutside={() => setOpen(false)}
            calendarClassName="date-picker-calendar"
            calendarContainer={MyContainer}
            selected={props.date}
            icon={<FaCalendarAlt />}
            dateFormat={getDateFormat(locale)}
            {...props.datePickerProps}
          />
        </motion.div>}
      </AnimatePresence>
    </div>
  )
}