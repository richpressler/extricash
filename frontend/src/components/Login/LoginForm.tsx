import * as React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';

import { LoginErrorGridItem } from './LoginErrorGridItem';

interface LoginFormProps {
  onSubmit: Function;
  error: string;
}

const initialState = {
  username: '',
  password: ''
};
type State = Readonly<typeof initialState>

export class LoginForm extends React.Component<LoginFormProps, {}> {
  readonly state: State = initialState

  constructor(props) {
    super(props);
  }

  handleInput(field, value) {
    this.setState({[field]: value});
  }

  render() {
    return (
      <form onSubmit={event => {
        event.preventDefault();
        return this.props.onSubmit(this.state);
      }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          spacing={8}
        >
          <Grid item>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item xs>
                <TextField
                  type="text"
                  value={this.state.username}
                  onChange={event => this.handleInput('username', event.target.value)}
                  label="Username"
                  fullWidth
                  autoFocus={true}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <VpnKey />
              </Grid>
              <Grid item xs>
                <TextField
                  type="password"
                  value={this.state.password}
                  label="Password"
                  fullWidth
                  onChange={event => this.handleInput('password', event.target.value)}/>
              </Grid>
            </Grid>
          </Grid>
          <LoginErrorGridItem item>
            {this.props.error}
          </LoginErrorGridItem>
          <Grid item>
            <Button type="submit" fullWidth variant="contained" color="primary">Log In</Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}