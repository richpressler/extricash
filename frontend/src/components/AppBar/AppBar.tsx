import * as React from 'react';
import { AppBar as UnstyledAppBar, Button, Hidden, Toolbar, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { AppBarMenuButton } from './AppBarMenuButton';
import { ExtricashDrawer } from '../ExtricashDrawer';

const StyledAppBar = withStyles(theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: (theme as any).layout.drawerWidth,
      width: `calc(100% - ${(theme as any).layout.drawerWidth}px)`
    }
  }
}), { withTheme: true })(UnstyledAppBar);

const AppBarTitle = withStyles({
  root: {
    flexGrow: 1
  }
})(Typography);

const initialState = {
  menuOpen: false
};
type State = Readonly<typeof initialState>

export class AppBar extends React.Component {
  readonly state: State = initialState

  constructor(props) {
    super(props);
  }

  toggleDrawer(state) {
    this.setState({menuOpen: state});
  }

  logout() {
    window.localStorage.removeItem('token');
  }
  
  render() {
    return (
      <div>
        <StyledAppBar position="static" color="secondary">
          <Toolbar>
            <Hidden smUp>
              <AppBarMenuButton color="inherit" aria-label="Menu" onClick={() => this.toggleDrawer(true)}>
                <MenuIcon />
              </AppBarMenuButton>
            </Hidden>
            <AppBarTitle variant="h6" color="inherit">
              Extricash
            </AppBarTitle>
            <Button color="inherit" onClick={this.logout}>Logout</Button>
          </Toolbar>
        </StyledAppBar>
        <Hidden smUp>
          <ExtricashDrawer isOpen={this.state.menuOpen} toggle={(state) => this.toggleDrawer(state)}/>
        </Hidden>
      </div>
    );
  }
}
