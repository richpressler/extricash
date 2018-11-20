import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { HomePage } from './HomePage';
import { DashboardPage } from './DashboardPage';

export class App extends React.Component {
  render() {
    return (
      <div className="main-body">
        <CssBaseline/>
        <div className="header">
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/dashboard" component={DashboardPage}></Route>
          </Switch>
        </div>
      </div>
    )
  };
}
