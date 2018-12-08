import * as React from 'react';
import { Link, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { Button, Hidden, IconButton, Paper, Toolbar, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Query } from 'react-apollo';

import { AppBar } from './AppBar';
import { ExtricashDrawer } from './ExtricashDrawer';
import { OverviewPage } from './OverviewPage';
import { BillsPage } from './BillsPage';

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

const Content = withStyles(theme => 
  ({
    root: {
      background: "none",
      boxShadow: "none",
      padding: "15px",
      [theme.breakpoints.up('sm')]: {
        marginLeft: (theme as any).layout.drawerWidth
      }
    }
  })
)(Paper);

const HomeLink = props => <Link to="/dashboard" {...props} />

export const DashboardPage: React.SFC<RouteProps> = ({ location }) => {
  const homeLinkProps = { to: '/dashboard' };
  if (!window.localStorage.getItem('token')) {
    return <Redirect to="/" />;
  }
  return location.pathname === '/dashboard' ?
    <Redirect to="/dashboard/overview" /> : 
    <div>
      <AppBar>
        <Toolbar>
          <AppBarMenuButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </AppBarMenuButton>
          <Button component={HomeLink} {...homeLinkProps}>
            <AppBarTitle variant="h6" color="inherit">
              Extricash
            </AppBarTitle>
          </Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <ExtricashDrawer permanent />
      </Hidden>
      <Content>
        <Switch>
          <Route path="/dashboard/overview" component={OverviewPage}></Route>
          <Route path="/dashboard/bills" component={BillsPage}></Route>
        </Switch>
      </Content>
    </div>;
}