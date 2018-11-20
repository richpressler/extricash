import * as React from 'react';
import { Button, Card, CardContent, Grid, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { LoginMutation } from '../../graphql';

import { LoginCardHeader } from './LoginHeader';
import { LoginErrorGridItem } from './LoginErrorGridItem';

interface LoginProps {
  history: any;
}

const initialState = {
  username: '',
  password: '',
  error: ''
};
type State = Readonly<typeof initialState>

class _Login extends React.Component<LoginProps, {}> {
  readonly state: State = initialState

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  handleInput(field, newValue) {
    this.setState({[field]: newValue});
  }

  handleSubmit(event, submitFn) {
    event.preventDefault();
    submitFn()
      .then(loginData => {
        window.localStorage.setItem('token', loginData.data.login.token);
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        const error = err.graphQLErrors[0].message;
        this.setState({ error });
      });
  }

  render() {
    return (
      <Mutation mutation={LoginMutation} variables={this.state}>
        {loginMutation => (
          <Card>
            <LoginCardHeader title="Extricash"/>
            <CardContent>
              <form onSubmit={event => this.handleSubmit(event, loginMutation)}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="stretch"
                  spacing={16}
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
                    {this.state.error}
                  </LoginErrorGridItem>
                  <Grid item>
                    <Button type="submit" fullWidth variant="contained" color="primary">Log In</Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        )}
      </Mutation>
    );
  }
}

export const Login = withRouter(_Login);