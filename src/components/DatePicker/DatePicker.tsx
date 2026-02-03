import React from 'react';
import { Input } from '../Input';
import styles from './DatePicker.module.css';

interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * The label text displayed above the date field.
   */
  title?: string;
  
  /**
   * If true, applies error styling.
   */
  isError?: boolean;
  
  /**
   * The error message to display below the field.
   */
  errorMessage?: string;

  /**
   * If true, allows selecting time (Hours, Minutes, Seconds) along with the date.
   * Renders as `datetime-local`.
   */
  showTime?: boolean;

  /**
   * Step attribute for time input (e.g. "1" for seconds, "60" for minutes).
   * Defaults to "1" (seconds) if showTime is true.
   */
  step?: string | number;
}

/**
 * A wrapper around the Input component specifically for Date selection.
 * Uses native browser date picker.
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, showTime = false, step, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type={showTime ? "datetime-local" : "date"}
        step={step !== undefined ? step : (showTime ? "1" : undefined)}
        className={`${styles.dateIcon} ${className || ''}`}
        {...props}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';

// --- DateRangePicker ---

interface DateRangePickerProps {
  /**
   * Label for the start date field.
   */
  startTitle?: string;

  /**
   * Label for the end date field.
   */
  endTitle?: string;

  /**
   * The selected start date (YYYY-MM-DD or ISO string).
   */
  startDate: string;

  /**
   * The selected end date (YYYY-MM-DD or ISO string).
   */
  endDate: string;

  /**
   * Callback when start date changes.
   */
  onStartChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback when end date changes.
   */
  onEndChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * If true, applies error styling to both fields.
   */
  isError?: boolean;

  /**
   * Error message to display (will be shown under the range).
   */
  errorMessage?: string;
  
  /**
   * Optional min date for the range.
   */
  min?: string;
  
  /**
   * Optional max date for the range.
   */
  max?: string;

  /**
   * If true, allows selecting time (Hours, Minutes, Seconds).
   */
  showTime?: boolean;

  /**
   * Step attribute for time input.
   */
  step?: string | number;
}

const formatDateValue = (date: Date, showTime: boolean): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  
  if (!showTime) {
    return `${year}-${month}-${day}`;
  }

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  return `${year}-${month}-${day}T${hours}:${minutes}:${second}`;
};

/**
 * A composite component for selecting a date range.
 * automatically enforces that End Date cannot be before Start Date.
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startTitle = 'Start Date',
  endTitle = 'End Date',
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  isError,
  errorMessage,
  min,
  max,
  showTime = false,
  step,
}) => {

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    onStartChange(e);

    // Auto-correct End Date if New Start > End Date
    if (endDate && newStart > endDate) {
      const startDateObj = new Date(newStart);
      // Valid date check
      if (!isNaN(startDateObj.getTime())) {
         const newEndDateObj = new Date(startDateObj.getTime());
         // Add 1 second if showTime, otherwise maybe 1 day? 
         // User requested "+1 second" specifically for time context.
         // If date only, keeping them equal or +1 day is standard.
         // Let's stick to +1 second logic conceptually. 
         // If just date, adding 1 second usually doesn't change text unless near midnight, 
         // so we might want to ensure it is at least same day or next day.
         // Given the prompt "如果是有時分秒的也要滿足這個判斷", we prioritize time logic.
         if (showTime) {
           newEndDateObj.setSeconds(newEndDateObj.getSeconds() + 1);
         } else {
           // For pure date, if Start > End, usually we set End = Start.
           // Or Start + 1 day. Let's set End = Start for Date-only to be safe/simple, 
           // or Start + 1 day if strict range. 
           // Let's use simple logic: Set End = Start (minimum valid range is 0 duration) 
           // unless user implies strictly greater. "+1s" implies strictly greater.
           // Let's just use the same Time object logic and format it. 
           // If it falls on same day, so be it.
           newEndDateObj.setDate(newEndDateObj.getDate()); 
         }
         
         const newEndStr = formatDateValue(newEndDateObj, showTime);

         // Trigger onEndChange
         const syntheticEvent = {
           ...e,
           target: { ...e.target, value: newEndStr, name: undefined },
           currentTarget: { ...e.currentTarget, value: newEndStr, name: undefined }
         } as unknown as React.ChangeEvent<HTMLInputElement>;
         
         onEndChange(syntheticEvent);
      }
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value;
    
    // Auto-correct End Date if New End < Start Date
    if (startDate && newEnd < startDate) {
       const startDateObj = new Date(startDate);
       if (!isNaN(startDateObj.getTime())) {
         const newEndDateObj = new Date(startDateObj.getTime());
         if (showTime) {
           newEndDateObj.setSeconds(newEndDateObj.getSeconds() + 1);
         }
         const newEndStr = formatDateValue(newEndDateObj, showTime);

         const syntheticEvent = {
            ...e,
            target: { ...e.target, value: newEndStr },
            currentTarget: { ...e.currentTarget, value: newEndStr }
         } as unknown as React.ChangeEvent<HTMLInputElement>;
         
         onEndChange(syntheticEvent);
         return;
       }
    }
    
    onEndChange(e);
  };

  return (
    <div className={styles.rangeContainer}>
      <DatePicker
        title={startTitle}
        value={startDate}
        onChange={handleStartChange}
        max={max} // Start date max can be explicit max. It can be > old endDate during interaction.
        min={min}
        isError={isError}
        showTime={showTime}
        step={step}
      />
      <span className={styles.rangeSeparator}>-</span>
      <DatePicker
        title={endTitle}
        value={endDate}
        onChange={handleEndChange}
        min={startDate || min} // HTML5 constraint
        max={max}
        isError={isError}
        errorMessage={errorMessage}
        showTime={showTime}
        step={step}
      />
    </div>
  );
};
