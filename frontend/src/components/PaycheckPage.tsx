import * as React from 'react';
import { Query } from 'react-apollo';
import { EnterDetails } from './Paycheck';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Typography } from '@material-ui/core';
import { meQuery } from '../graphql/queries';
import { User } from '../../../backend/src/modules/user';

export interface Allocation {
  amount: number;
  dateString: string;
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
    this.setState({ date: moment(dateString, 'YYYY-DD-MM') });
  };

  handleChangeAmount = (amount: number) => {
    this.setState({ totalAmount: amount });
  };

  render() {
    return (
      <Query<{ me: User }> query={meQuery}>
        {({ data, error, loading }) => {
          console.log(data);
          return !loading && data ? (
            <>
              <Typography variant="h4" align="center">
                Enter Paycheck
              </Typography>
              <EnterDetails
                dateString={this.state.date.format('YYYY-DD-MM')}
                accounts={data.me.accounts}
                amount={this.state.totalAmount}
                allocations={this.state.allocations}
                bills={data.me.bills}
                onChangeDate={this.handleChangeDate}
                onChangeAmount={this.handleChangeAmount}
              />
            </>
          ) : null;
        }}
      </Query>
    );
  }
}
