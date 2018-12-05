import * as React from 'react';
import { Button, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { AppBar } from './AppBar';

const AppBarTitle = withStyles({
  root: {
    flexGrow: 1
  }
})(Typography);

const AppBarMenuButton = withStyles({
  root: {
    marginLeft: -12,
    marginRight: 20
  }
})(IconButton);

export class DashboardPage extends React.Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <AppBarMenuButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </AppBarMenuButton>
          <AppBarTitle variant="h6" color="inherit">
            Extricash
          </AppBarTitle>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}
