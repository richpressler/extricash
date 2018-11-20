import * as React from 'react';
import { Button, Card, CardHeader, CardContent, Grid, TextField, withStyles } from '@material-ui/core';
import { TextAlignProperty } from 'csstype';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';

const cardHeaderStyles = {
  root: {
    backgroundColor: '#78909C'
  },
  title: {
    color: 'white',
    textAlign: 'center' as TextAlignProperty
  }
};

const LoginCardHeader = withStyles(cardHeaderStyles)(CardHeader);

const initialState = {
  username: '',
  password: ''
};
type State = Readonly<typeof initialState>

export class Login extends React.Component {
  readonly state: State = initialState

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleInput(field, newValue) {
    this.setState({[field]: newValue});
  }

  handleSubmit(event) {
    event.preventDefault();
    
    
  }

  render() {
    return (
      <Card>
        <LoginCardHeader title="Extricash"/>
        <CardContent>
          <form onSubmit={event => this.handleSubmit(event)}>
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
              <Grid item>
                <Button type="submit" fullWidth variant="contained" color="primary">Log In</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    );
  }
}
