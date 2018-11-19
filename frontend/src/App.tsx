import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomePage } from './home/HomePage';
import { DashboardPage } from './dashboard/DashboardPage';

export class App extends React.Component {
  render() {
    return (
      <div>
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
