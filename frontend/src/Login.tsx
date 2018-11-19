import * as React from 'react';
import { render } from 'react-dom';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }
  handleInput(field, newValue) {

  }
  render() {
    return (
      <div className="login-container">
        <div className="login-title">Login</div>
        <div className="login-form">
          <div className="login-element">
            <div className="login-label">
              Username
            </div>
            <div className="login-input">
              <input type="text" onChange={event => this.handleInput('username', event.target.value)}></input>
            </div>
          </div>
          <div className="login-element">
            <div className="login-label">
              Password
            </div>
            <div className="login-input">
              <input type="text" onChange={event => this.handleInput('password', event.target.value)}></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}