import React from 'react';
import {
  Container,
  CssBaseline,
  Divider,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    marginTop: theme.spacing(3),
  },
  title: {
    color: theme.palette.primary.main,
  },
}));

function App(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Router>
        <Container className={classes.app}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3" className={classes.title}>
                Purlab Coding Task
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </>
  );
}

export default App;
