"use client";

import { formatDate } from '@utils/dates';
import { useLocale, useTranslations } from 'next-intl';

// Props interface
interface Props {
  dates: {
    [key: string]: Date;
  };
  numberPerRow: number;
}

// Function to split array into rows based on numberPerRow
const splitIntoRows = (keys: string[], numberPerRow: number): string[][] => {
  return keys.reduce((resultArray: string[][], item: string, index: number) => {
    const chunkIndex = Math.floor(index / numberPerRow);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // Start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}

// DateDetails component
export function DateDetails(props: Props) {
  // Locale
  const locale = useLocale();

  // Translations
  const t = useTranslations('Calendar');

  // Split keys into rows based on numberPerRow
  const rows = splitIntoRows(Object.keys(props.dates), props.numberPerRow);

  // Get CSS classes for each cell
  const getCellClassNames = (
    isFirst: boolean,
    isLast: boolean,
    isFirstRow: boolean,
    isLastRow: boolean
  ) => {
    return [
      "flex flex-col gap-1 border border-grey-light justify-center items-center w-full",
      isFirst && isFirstRow ? "rounded-tl-md" : "",
      isLast && isFirstRow ? "rounded-tr-md" : "",
      isFirst && isLastRow ? "rounded-bl-md" : "",
      isLast && isLastRow ? "rounded-br-md" : "",
      !isLast ? "border-r-0" : "",
    ].join(" ");
  };

  // Get CSS classes for each header
  const getHeaderClassNames = (
    isFirst: boolean,
    isLast: boolean,
    isFirstRow: boolean
  ) => {
    return [
      "bg-table-bg flex justify-center w-full h-full border-b border-grey-light",
      isFirst && isFirstRow ? "rounded-tl-md" : "",
      isLast && isFirstRow ? "rounded-tr-md" : "",
      !isLast ? "border-r-0" : "",
    ].join(" ");
  };

  // Render
  return (
    <div className='flex flex-col gap-4 my-4'>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className='flex gap-0'>
          {row.map((key, index) => {
            const isFirstRow = rowIndex === 0;
            const isLastRow = rowIndex === rows.length - 1;
            const isFirst = index === 0;
            const isLast = index === row.length - 1;

            return (
              <div
                key={index}
                className={getCellClassNames(isFirst, isLast, isFirstRow, isLastRow)}
              >
                <div className={getHeaderClassNames(isFirst, isLast, isFirstRow)}>
                  <span className='px-4 py-2'>{t(key)}</span>
                </div>

                <div className='flex gap-1 px-4 py-2'>
                  {formatDate(locale, props.dates[key])}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}