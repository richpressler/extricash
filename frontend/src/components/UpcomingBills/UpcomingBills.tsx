import * as React from 'react';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { Bill } from '../../../../backend/src/modules/user';

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

interface UpcomingBillsProps {
  bills: Bill[];
}

export const UpcomingBills: React.SFC<UpcomingBillsProps> = props => {
  const getUpcomingBills = bills =>
    bills
      .filter(bill => bill.dayOfMonth >= new Date().getDate())
      .sort((bill1, bill2) => bill1.dayOfMonth - bill2.dayOfMonth)
      .slice(0, 5);
  return props.bills ? (
    <>
      <SectionHeader variant="h4">Upcoming Bills</SectionHeader>
      {getUpcomingBills(props.bills).map(bill => (
        <StyledCard key={bill.name}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {bill.name}
            </Typography>
            <Typography variant="h6">
              {bill.dayOfMonth} - ${bill.amount.toFixed(2)}
            </Typography>
          </CardContent>
        </StyledCard>
      ))}
    </>
  ) : (
    <>Loading...</>
  );
};
