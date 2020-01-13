import { Card, CardContent, Grid, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';

import { User } from '../../../../backend/src/modules/user';

export interface ProfileSummaryProps {
  user: User;
}

const StyledCard = withStyles({
  root: {
    marginBottom: '15px'
  }
})(Card);

const MaxWidthGrid = withStyles({
  container: {
    width: '100%'
  }
})(Grid);

export const ProfileSummary: React.SFC<ProfileSummaryProps> = props => {
  const getCashBalance = accounts => accounts.reduce((balance, account) => balance + account.balance, 0).toFixed(2);
  const getBillTotal = bills => bills.reduce((amount, bill) => amount + bill.amount, 0);
  const getDisposableIncome = user => user.monthlyIncome - getBillTotal(user.bills);
  return (
    <StyledCard>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Profile Summary
        </Typography>
        <MaxWidthGrid container>
          <Grid item sm>
            <Grid container>
              <Grid item sm>
                <Typography>Cash Balance:</Typography>
              </Grid>
              <Grid item sm>
                <Typography>${getCashBalance(props.user.accounts)}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm>
            <Grid container>
              <Grid item sm>
                <Typography>Monthly Income:</Typography>
              </Grid>
              <Grid item sm>
                <Typography>${props.user.monthlyIncome.toFixed(2)}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm>
                <Typography>Monthly Bill Outlay:</Typography>
              </Grid>
              <Grid item sm>
                <Typography>${getBillTotal(props.user.bills).toFixed(2)}</Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item sm>
                <Typography>Disposable Income:</Typography>
              </Grid>
              <Grid item sm>
                <Typography>${getDisposableIncome(props.user)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </MaxWidthGrid>
      </CardContent>
    </StyledCard>
  );
};
