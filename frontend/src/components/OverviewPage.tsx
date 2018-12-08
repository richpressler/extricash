import * as React from 'react';
import { Query } from 'react-apollo';

import { AccountSummary } from './AccountSummary';
import { meQuery } from '../graphql/queries';
import { User } from '../../../backend/src/modules/user';

export class OverviewPage extends React.Component {
  render() {
    return (
      <Query query={meQuery}>
        {({ loading, error, data }) => (
          <AccountSummary accounts={data.me && data.me.accounts}/>
        )}
      </Query>
    );
  }
}