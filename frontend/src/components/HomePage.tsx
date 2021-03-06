import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, withStyles } from '@material-ui/core'

import { Login } from './Login';

const HomeContainerGrid = withStyles({
  container: {
    height: '100vh'
  }
})(Grid);

export class HomePage extends React.Component {
  render() {
    return window.localStorage.getItem('token') ? <Redirect to="/dashboard" /> : (
      <HomeContainerGrid container
        direction="column"
        justify="center"
        alignItems="center"
        className="home-container"
      >
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={10} sm={4} md={3} lg={2}>
            <Login/>
          </Grid>
        </Grid>
      </HomeContainerGrid>
    );
  }
}