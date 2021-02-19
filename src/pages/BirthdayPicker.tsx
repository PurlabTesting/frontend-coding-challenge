import React, { useState } from 'react';
import {
  Theme,
  makeStyles,
  Grid,
} from '@material-ui/core';

import DatePicker from '../components/DatePicker';

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    marginTop: theme.spacing(1),
  },
}));

type BirthdayPickerType = {

};

const BirthdayPicker: React.FC<BirthdayPickerType> = () => {
  const classes = useStyles();
  const [dob, setDob] = useState(new Date());

  const onDateSelect = (date: Date, dateStr = '') => {
    console.log(date, dateStr);
    setDob(date);
  };

  return (
    <>
      <Grid container spacing={3} className={classes.home}>
        <Grid item xs={12}>
          <div>
            Date of Birth (MaterialUI):
            <DatePicker type="material" value={dob} onDateSelect={onDateSelect} />
          </div>
          <div>
            Date of Birth (Custom):
            <DatePicker type="custom" value={dob} onDateSelect={onDateSelect} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default BirthdayPicker;
