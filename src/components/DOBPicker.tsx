import React, { useState } from 'react';
import { format as formatDate } from 'date-fns';
import { makeStyles } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import cx from 'classnames';
import { daysInMonth, emptyDaysInMonth } from '../utils/dates';
import Modal from './Modal';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', ' July',
  'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const color = '#43a047';

const buttonStyle = {
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'transparent',
  outline: 'transparent',
  '&:active, &:focus': {
    boxShadow: '1px 1px 2px rgba(0, 0, 0, .3)',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 310,
    height: 465,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  eventIcon: {
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: color,
    padding: '0.5rem',
  },
  headerItem: {
    padding: '0.5rem',
    margin: '0 0.5rem',
  },
  headerButton: {
    ...buttonStyle,
    color: '#fff',
  },
  content: {
    height: 315,
    overflow: 'scroll',
    padding: '0 1rem',
  },
  years: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '1.1rem',
  },
  year: {
    ...buttonStyle,
    width: '100%',
    padding: '0.7rem',
    textAlign: 'center',
  },
  selectedYear: {
    color,
    fontWeight: 'bold',
    fontSize: '1.3rem',
  },
  months: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 33.3%)',
    height: '100%',
  },
  month: {
    ...buttonStyle,
  },
  selectedMonth: {
    color,
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  dates: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, calc(100% / 7))',
  },
  date: {
    ...buttonStyle,
    height: 45,
    textAlign: 'center',
  },
  days: {
    padding: '0.7rem 0 0.3rem',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.3)',
  },
  selectedDate: {
    color,
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  footer: {
    height: 50,
    textAlign: 'right',
    padding: '0 0.75rem 0.75rem',
  },
  footerButton: {
    ...buttonStyle,
    color,
    fontWeight: 'bold',
    padding: '0.75rem',
    '&:disabled': {
      color: 'rgba(0, 0, 0, 0.3)',
      cursor: 'default',
    },
  },
});

type DOBPickerProps = {
  type?: 'material' | 'custom';
  onDOBSelect: (date: Date, dateAsString: string) => void;
  format?: string;
  placeholder?: string;
  dob?: Date;
  maxAgeYears?: number;
};

const DOBPicker: React.FC<DOBPickerProps> = ({
  onDOBSelect,
  format = 'MM/dd/yyyy',
  placeholder = 'mm/dd/yyyy',
  dob,
  maxAgeYears = 120,
}) => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const classes = useStyles();

  const [selectedDOB, setSelectedDOB] = useState(dob);
  const [selectedYear, setSelectedYear] = useState((selectedDOB || today).getFullYear());
  const [selectedMonth, setSelectedMonth] = useState((selectedDOB || today).getMonth());
  const [selectedDate, setSelectedDate] = useState((selectedDOB || today).getDate());
  const [okEnabled, setOkEnabled] = useState(false);
  const [view, setView] = useState<'year' | 'month' | 'date'>(!selectedDOB ? 'year' : 'date');

  const onSelectYear = (year: number) => {
    setSelectedYear(year);
    setView('month');
  };

  const onSelectMonth = (month: number) => {
    setSelectedMonth(month);
    setView('date');
  };

  const onSelectDate = (date: number) => {
    setSelectedDate(date);
    setOkEnabled(true);
  };

  const onOK = () => {
    const pickedDate = new Date(selectedYear, selectedMonth, selectedDate);
    setSelectedDOB(pickedDate);
    onDOBSelect(pickedDate, formatDate(pickedDate, format));
    setShowDatePicker(false);
  };

  const onCancel = () => setShowDatePicker(false);

  const formattedDate = selectedDOB ? formatDate(selectedDOB, format) : '';

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={formattedDate}
        onClick={() => setShowDatePicker(true)}
        onChange={() => { }}
      />
      <EventIcon className={classes.eventIcon} onClick={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <Modal onClose={() => setShowDatePicker(false)}>
          <div className={classes.container}>
            <div className={classes.header}>
              <button className={classes.headerButton} onClick={() => setView('year')} type="button">
                <h2 className={classes.headerItem}>
                  {selectedYear}
                </h2>
              </button>
              <button className={classes.headerButton} onClick={() => setView('month')} type="button">
                <h1 className={classes.headerItem}>
                  {MONTHS[selectedMonth]}
                </h1>
              </button>
            </div>
            <div className={classes.content}>
              {view === 'year' && (
                <div className={classes.years}>
                  {Array(maxAgeYears).fill(0).map((_, i) => {
                    const year = todayYear - i;
                    return (
                      <button
                        type="button"
                        className={cx(classes.year, {
                          [classes.selectedYear]: year === selectedYear,
                        })}
                        onKeyPress={(e) => e.key === '13' && onSelectYear(year)}
                        onClick={() => onSelectYear(year)}
                        key={year}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              )}
              {view === 'month' && (
                <div className={classes.months}>
                  {MONTHS.map((_, month) => (
                    <button
                      type="button"
                      className={cx(classes.month, {
                        [classes.selectedMonth]: month === selectedMonth,
                      })}
                      onKeyPress={(e) => e.key === '13' && onSelectMonth(month)}
                      onClick={() => onSelectMonth(month)}
                      key={MONTHS[month]}
                    >
                      {MONTHS[month]}
                    </button>
                  ))}
                </div>
              )}
              {view === 'date' && (
                <>
                  <div className={classes.dates}>
                    {DAYS.map((d) => <div key={d} className={classes.days}>{d}</div>)}
                  </div>
                  <div className={classes.dates}>
                    {Array(emptyDaysInMonth(selectedYear, selectedMonth)).fill(0).map((_, d) => (
                      <div key={`empty-${DAYS[d]}`} />
                    ))}
                    {Array(daysInMonth(selectedYear, selectedMonth)).fill(0).map((_, d) => {
                      const date = d + 1;
                      return (
                        <button
                          type="button"
                          className={cx(classes.date, {
                            [classes.selectedDate]: selectedDate === date,
                          })}
                          onKeyPress={(e) => e.key === '13' && onSelectDate(date)}
                          onClick={() => onSelectDate(date)}
                          key={date}
                        >
                          {date}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <div
              className={classes.footer}
            >
              <button type="button" className={classes.footerButton} onKeyPress={(e) => e.key === '13' && onCancel()} onClick={onCancel}>CANCEL</button>
              <button type="button" className={classes.footerButton} onKeyPress={(e) => e.key === '13' && onOK()} onClick={onOK} disabled={!okEnabled}>OK</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DOBPicker;
