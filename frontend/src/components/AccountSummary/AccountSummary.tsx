import React from 'react';
import { Button, Card, CardActions, CardContent, Typography, withStyles } from '@material-ui/core';
import moment from 'moment';
import { Account } from '../../../../backend/src/modules/account';

const StyledCard = withStyles(theme => ({
  root: {
    width: '350px',
    marginBottom: '15px',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}))(Card);

const SectionHeader = withStyles({
  root: {
    borderBottom: '1px solid white',
    marginBottom: '15px'
  }
})(Typography);

interface AccountSummaryProps {
  accounts: Account[];
}

export const AccountSummary: React.SFC<AccountSummaryProps> = props => {
  const formatBalance = balance => balance.toFixed(2);
  const formatDate = date => moment(date).format('M/D/YYYY');
  const formatAmount = amount => (amount < 0 ? `-$${Math.abs(amount).toFixed(2)}` : `+$${amount.toFixed(2)}`);
  return props.accounts ? (
    <>
      <SectionHeader variant="h4">Account Summary</SectionHeader>
      {props.accounts.map(account => (
        <StyledCard key={account.id}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {account.name}
            </Typography>
            <Typography variant="h6">${formatBalance(account.balance)}</Typography>
            <Typography color="textSecondary">
              Last transaction: {formatAmount(account.transactions[0].amount)} on{' '}
              {formatDate(account.transactions[0].date)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Log Transactions
            </Button>
            <Button size="small" color="primary">
              View History
            </Button>
          </CardActions>
        </StyledCard>
      ))}
    </>
  ) : (
    <>Loading...</>
  );
};
