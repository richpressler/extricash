import * as React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import VpnKey from '@material-ui/icons/VpnKey';

import { LoginErrorGridItem } from './LoginErrorGridItem';

interface RegistrationFormProps {
  onSubmit: Function;
  error: string;
}

const initialState = {
  username: '',
  password: '',
  passwordConfirm: '',
  email: '',
  showEmailError: false,
  emailError: '',
  validateEmail: false
};
type State = Readonly<typeof initialState>

export class RegistrationForm extends React.Component<RegistrationFormProps, {}> {
  readonly state: State = initialState

  constructor(props) {
    super(props);
  }

  handleInput(field: string, value) {
    this.setState({ [field]: value });
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
                <Email color="action"/>
              </Grid>
              <Grid item xs>
                <TextField
                  type="email"
                  value={this.state.email}
                  onChange={event => this.handleInput('email', event.target.value)}
                  label="Email"
                  fullWidth
                  autoFocus={true}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <AccountCircle color="action"/>
              </Grid>
              <Grid item xs>
                <TextField
                  type="text"
                  value={this.state.username}
                  onChange={event => this.handleInput('username', event.target.value)}
                  label="Username"
                  fullWidth/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <VpnKey color="action"/>
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
          <Grid item>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <VpnKey color="action"/>
              </Grid>
              <Grid item xs>
                <TextField
                  type="password"
                  value={this.state.passwordConfirm}
                  label="Confirm Password"
                  fullWidth
                  onChange={event => this.handleInput('passwordConfirm', event.target.value)}/>
              </Grid>
            </Grid>
          </Grid>
          <LoginErrorGridItem item>
            {this.props.error}
          </LoginErrorGridItem>
          <Grid item>
            <Button type="submit" fullWidth variant="contained" color="primary">Register</Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}