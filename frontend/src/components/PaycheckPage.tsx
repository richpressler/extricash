import React from 'react';
import { Query } from 'react-apollo';
import { EnterDetails } from './Paycheck';
import moment from 'moment';
import { Moment } from 'moment';
import { Typography } from '@material-ui/core';
import { meQuery } from '../graphql/queries';
import { User, Bill } from '../../../backend/src/modules/user';

export interface Allocation {
  amount: number;
  accountId: string;
  description: string;
}

interface PaycheckPageState {
  date: Moment;
  totalAmount: number;
  allocations: Allocation[];
}

export class PaycheckPage extends React.Component<{}, PaycheckPageState> {
  state = {
    date: moment(),
    totalAmount: 0,
    allocations: []
  };

  handleChangeDate = (dateString: string) => {
    this.setState({ date: moment(dateString, 'YYYY-MM-DD') });
  };

  handleChangeAmount = (amount: number) => {
    this.setState({ totalAmount: amount });
  };

  handleStartAllocating = (bills: Bill[], billAccountId: string) => {
    const paycheckDayOfMonth = this.state.date.date();
    // If paycheck date hovers around EOM, assign for bills between 1st and 15th
    const isNearEndOfMonth = paycheckDayOfMonth > 23 || paycheckDayOfMonth < 6;
    const billMinDate = isNearEndOfMonth ? 0 : 15;
    const billCutoffDate = isNearEndOfMonth ? 15 : 31;
    const allocations = bills.filter(bill => {
      return bill.dayOfMonth <= billCutoffDate && bill.dayOfMonth > billMinDate;
    }).map(bill => {
      return {
        accountId: billAccountId,
        description: bill.name,
        amount: bill.amount
      }
    });
    this.setState({ allocations });
  }

  render() {
    return (
      <Query<{ me: User }> query={meQuery}>
        {({ data, error, loading }) => {
          return !loading && data ? (
            <>
              <Typography variant="h4" align="center">
                Enter Paycheck
              </Typography>
              <EnterDetails
                dateString={this.state.date.format('YYYY-MM-DD')}
                accounts={data.me.accounts}
                amount={this.state.totalAmount}
                allocations={this.state.allocations}
                bills={data.me.bills}
                onChangeDate={this.handleChangeDate}
                onChangeAmount={this.handleChangeAmount}
                onStartAllocating={this.handleStartAllocating}
              />
            </>
          ) : null;
        }}
      </Query>
    );
  }
}
