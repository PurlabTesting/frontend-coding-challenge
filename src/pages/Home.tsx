import React from 'react';
import {
  Theme,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    marginTop: theme.spacing(1),
  },
}));

function Home(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} className={classes.home}>
        <Grid item xs={12}>
          <Link to="/birthdayPicker">Pick your birthday!</Link>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
