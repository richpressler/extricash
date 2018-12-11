import { Card, CardContent, Grid, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';

import { User } from '../../../../backend/src/modules/user';
import { reduce } from 'async';

export interface ProfileSummaryProps {
  user: User
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
            <Typography>
              <Grid container>
                <Grid item sm>
                  Cash Balance:
                </Grid>
                <Grid item sm>
                  ${getCashBalance(props.user.accounts)}
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item sm>
            <Typography>
              <Grid container>
                <Grid item sm>
                  Monthly Income:
                </Grid>
                <Grid item sm>
                  ${props.user.monthlyIncome.toFixed(2)}
                </Grid>
              </Grid>
            </Typography>
            <Typography>
              <Grid container>
                <Grid item sm>
                  Monthly Bill Outlay:
                </Grid>
                <Grid item sm>
                  ${getBillTotal(props.user.bills).toFixed(2)}
                </Grid>
              </Grid>
            </Typography>
            <Typography>
              <Grid container>
                <Grid item sm>
                  Disposable Income:
                </Grid>
                <Grid item sm>
                  ${getDisposableIncome(props.user)}
                </Grid>
              </Grid>
            </Typography>
          </Grid>
        </MaxWidthGrid>
      </CardContent>
    </StyledCard>
  );
};