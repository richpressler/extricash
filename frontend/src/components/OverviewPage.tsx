import * as React from 'react';
import { Query } from 'react-apollo';
import { Grid, Tooltip, Typography, withStyles } from '@material-ui/core';

import { AccountSummary } from './AccountSummary';
import { ProfileSummary } from './ProfileSummary';
import { UpcomingBills } from './UpcomingBills';
import { meQuery } from '../graphql/queries';

const PaddedGrid = withStyles({
  item: {
    paddingLeft: '5px',
    paddingRight: '5px'
  }
})(Grid);

export class OverviewPage extends React.Component {
  render() {
    return (
      <Query query={meQuery}>
        {({ data, loading }) =>
          loading ? null : (
            <>
              <ProfileSummary user={data.me} />
              <Grid container>
                <PaddedGrid item sm={6}>
                  <Tooltip title="test" placement="top">
                    <Typography>This is a test2</Typography>
                  </Tooltip>
                  <AccountSummary accounts={data.me && data.me.accounts} />
                </PaddedGrid>
                <PaddedGrid item sm={6}>
                  <UpcomingBills bills={data.me && data.me.bills} />
                </PaddedGrid>
              </Grid>
            </>
          )
        }
      </Query>
    );
  }
}
