import * as React from 'react';
import { Card, CardActionArea, CardContent, Tab, Tabs, withStyles } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { LoginMutation } from '../../graphql';

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

  handleRegister(userDetails, mutation) {
    console.log(userDetails);
  }

  render() {
    return (
      <Mutation mutation={LoginMutation}>
        {loginMutation => (
          <Card>
            <LoginCardHeader title="Extricash"/>
            <CardActionArea>
              <Tabs fullWidth value={this.state.activeTab} onChange={(event, value) => this.handleTabChange(value)}>
                <LoginTab label="Login"/>
                <LoginTab label="Register"/>
              </Tabs>
            </CardActionArea>
            <CardContent>
              {this.state.activeTab === 0 && <LoginForm onSubmit={userDetails => this.handleLogin(userDetails, loginMutation)} error={this.state.error}></LoginForm>}
              {this.state.activeTab === 1 && <RegistrationForm onSubmit={userDetails => this.handleRegister(userDetails, loginMutation)} error={this.state.error}></RegistrationForm>}
            </CardContent>
          </Card>
        )}
      </Mutation>
    );
  }
}

export const Login = withRouter(_Login);