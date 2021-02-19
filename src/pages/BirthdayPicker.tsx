import React, { useState } from 'react';
import {
  Theme,
  makeStyles,
  Grid,
} from '@material-ui/core';

import DOBPicker from '../components/DOBPicker';

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    marginTop: theme.spacing(1),
  },
}));

type BirthdayPickerType = {

};

const BirthdayPicker: React.FC<BirthdayPickerType> = () => {
  const classes = useStyles();
  const today = new Date();
  const [dob, setDob] = useState(today);

  const onDOBSelect = (newDate: Date, dateStr: string) => {
    setDob(newDate);
    console.log(dateStr);
  };

  return (
    <form onSubmit={(e) => {
      e.stopPropagation();
      e.preventDefault();
    }}
    >
      <Grid container spacing={3} className={classes.home}>
        <Grid item xs={12}>
          <div>
            Date of Birth (uncontrolled field):
            <DOBPicker type="custom" onDOBSelect={onDOBSelect} />
          </div>
          <div>
            Date of Birth (controlled field):
            <DOBPicker type="custom" dob={dob} onDOBSelect={onDOBSelect} />
          </div>
        </Grid>
      </Grid>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BirthdayPicker;
