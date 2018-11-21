import * as React from 'react';
import { Card, CardActionArea, CardContent, Tab, Tabs, withStyles } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { LoginMutation, RegisterMutation } from '../../graphql';

import { LoginCardHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';

const tabStyles = {
  root: {
    minWidth: 0
  }
};
const LoginTab = withStyles(tabStyles)(Tab);

interface LoginProps {
  history: any;
}

const initialState = {
  error: '',
  activeTab: 0
};
type State = Readonly<typeof initialState>

class _Login extends React.Component<LoginProps, {}> {
  readonly state: State = initialState

  constructor(props) {
    super(props);
  }

  handleTabChange(value) {
    this.setState({ activeTab: value });
  }

  handleLogin(userDetails, mutation) {
    mutation({ variables: { ...userDetails } })
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

  handleRegister({username, password, passwordConfirm, email}, mutation) {
    if (password !== passwordConfirm) {
      return this.setState({ error: 'Passwords must match.' });
    }
    
    mutation({ variables: { username, password, email }})
      .then(registerData => {
        window.localStorage.setItem('token', registerData.data.register.token);
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
      <Card>
        <LoginCardHeader title="Extricash"/>
        <CardActionArea>
          <Tabs fullWidth value={this.state.activeTab} onChange={(event, value) => this.handleTabChange(value)}>
            <LoginTab label="Login"/>
            <LoginTab label="Register"/>
          </Tabs>
        </CardActionArea>
        <CardContent>
          {this.state.activeTab === 0 && (
            <Mutation mutation={LoginMutation}>
              {loginMutation => (
                <LoginForm onSubmit={userDetails => this.handleLogin(userDetails, loginMutation)} error={this.state.error}></LoginForm>
              )}
            </Mutation>
          )}
          {this.state.activeTab === 1 && (
            <Mutation mutation={RegisterMutation}>
              {registerMutation => (
                <RegistrationForm onSubmit={userDetails => this.handleRegister(userDetails, registerMutation)} error={this.state.error}></RegistrationForm>
              )}
            </Mutation>
          )}
        </CardContent>
      </Card>
    );
  }
}

export const Login = withRouter(_Login);