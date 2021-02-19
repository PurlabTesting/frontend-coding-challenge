import React, { useState } from 'react';
import { format as dateFormat } from 'date-fns';
import { DatePicker as DatePickerMUI } from '@material-ui/pickers';

type DatePickerProps = {
  type?: 'material' | 'custom';
  onDateSelect: (date: Date, dateAsString: string) => void;
  format?: string;
  value: Date;
};

const DatePicker: React.FC<DatePickerProps> = ({
  type = 'material',
  onDateSelect,
  format = 'MM/dd/yyyy',
  value,
}) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());

  if (type === 'material') {
    return (
      <DatePickerMUI
        label=""
        value={value}
        onChange={(date) => {
          onDateSelect(date as Date, 'a');
        }}
        animateYearScrolling
        autoOk
        openTo="year"
        format={format}
      />
    );
  }

  return (
    <>
      <button type="button" onClick={() => onDateSelect(new Date(), dateFormat(new Date(), format))}>
        {year}
      </button>
      <button type="button" onClick={() => setYear(year + 1)}>increment year</button>
    </>
  );
};

export default DatePicker;
