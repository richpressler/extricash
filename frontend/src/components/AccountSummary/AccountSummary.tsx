import * as React from 'react';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { Account } from '../../../../backend/src/modules/account';

const StyledCard = withStyles(theme => (
  {
    root: {
      width: '350px',
      marginBottom: '15px',
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    }
  }
))(Card);

interface AccountSummaryProps {
  accounts: Account[]
}

export const AccountSummary: React.SFC<AccountSummaryProps> = props => {
  console.log(props);
  return props.accounts ? (
    <div>
      {props.accounts.map(account => (
        <StyledCard key={account.id}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {account.name}
            </Typography>
            <Typography variant="h6">
              $654.29
            </Typography>
            <Typography color="textSecondary">
              Last updated 12/6/2018
            </Typography>
          </CardContent>
        </StyledCard>
      ))}
    </div>
  ) : <div>Loading...</div>;
};