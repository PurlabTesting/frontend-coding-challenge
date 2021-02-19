/* eslint-disable no-restricted-syntax */
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
  const [dob1, setDob1] = useState<Date>();
  const [dob2, setDob2] = useState<Date>(new Date(2000, 0, 1));
  const [dob3, setDob3] = useState<Date>();
  const [formJson, setFormJson] = useState({});
  return (
    <form onSubmit={(e) => {
      e.stopPropagation();
      e.preventDefault();
      const inputs = (e.target as HTMLFormElement).querySelectorAll('input');
      const formJsonData = Array.prototype.slice.call(inputs).reduce((acc, i) => {
        acc[i.name] = i.value;
        return acc;
      }, {});
      setFormJson(formJsonData);
    }}
    >
      <Grid container spacing={3} className={classes.home}>
        <Grid item xs={12}>
          <DOBPicker name="dob1" dob={dob1} onChange={setDob1} label="DOB (without date)" />
        </Grid>
        <Grid item xs={12}>
          <DOBPicker name="dob2" dob={dob2} onChange={setDob2} label="DOB (with date)" />
        </Grid>
        <Grid item xs={12}>
          <DOBPicker name="dob3" dob={dob3} onChange={setDob3} label="DOB (18 or older)" minAge={18} />
        </Grid>
        <Grid item xs={12}>
          <button type="submit">Submit</button>
        </Grid>
        <Grid item xs={12}>
          <>
            <div>Form submit json:</div>
            {JSON.stringify(formJson, null, 2)}
          </>
        </Grid>
      </Grid>
    </form>
  );
};

export default BirthdayPicker;
