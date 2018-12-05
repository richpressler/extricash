import * as React from 'react';
import { AppBar as UnstyledAppBar, Button, Toolbar, Typography, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { AppBarMenuButton } from './AppBarMenuButton';
import { ExtricashDrawer } from '../ExtricashDrawer';

const StyledAppBar = withStyles({
  root: {
    flexGrow: 1
  }
})(UnstyledAppBar);

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
  
  render() {
    return (
      <div>
        <StyledAppBar position="static" color="secondary">
          <Toolbar>
            <AppBarMenuButton color="inherit" aria-label="Menu" onClick={() => this.toggleDrawer(true)}>
              <MenuIcon />
            </AppBarMenuButton>
            <AppBarTitle variant="h6" color="inherit">
              Extricash
            </AppBarTitle>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </StyledAppBar>
        <ExtricashDrawer isOpen={this.state.menuOpen} toggle={(state) => this.toggleDrawer(state)}/>
      </div>
    );
  }
}
