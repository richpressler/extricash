import React from 'react';
import {
  TextField,
  Grid,
  withStyles,
  Button,
  MenuItem,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Select
} from '@material-ui/core';
import { Account } from '../../../../backend/src/modules/account';
import { Bill } from '../../../../backend/src/modules/user';
import { Allocation } from '../PaycheckPage';

interface EnterDetailsProps {
  accounts: Account[];
  allocations: Allocation[];
  amount: number;
  bills: Bill[];
  dateString: string;
  onChangeAmount: (amount: number) => void;
  onChangeDate: (date: string) => void;
  onStartAllocating: (bills: Bill[], billAccountId: string) => void;
}

const StyledGrid = withStyles({
  container: {
    marginTop: '1rem'
  }
})(Grid);

interface EnterDetailsState {
  isAllocating: boolean;
}

export class EnterDetails extends React.Component<EnterDetailsProps, EnterDetailsState> {
  state = {
    isAllocating: false
  };

  handleChangeDate = evt => this.props.onChangeDate(evt.target.value);

  handleChangeAmount = evt => this.props.onChangeAmount(Number(evt.target.value));

  handleStartAllocating = () => {
    this.props.onStartAllocating(this.props.bills, this.props.accounts.find(account => account.name === 'Bill Expense').id);
    this.setState({ isAllocating: true });
  };

  render() {
    return (
      <StyledGrid container direction="column" alignItems="center">
        <Grid item>
          <TextField
            id="standard-name"
            label="Date"
            type="date"
            value={this.props.dateString}
            onChange={this.handleChangeDate}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <TextField
            id="standard-name"
            label="Amount"
            type="number"
            value={this.props.amount}
            onChange={this.handleChangeAmount}
            margin="normal"
          />
        </Grid>
        {!this.state.isAllocating ? (
          <Grid item>
            <Button onClick={this.handleStartAllocating}>Submit</Button>
          </Grid>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.allocations.map((allocation, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Select value={allocation.accountId} onChange={() => {}}>
                      {this.props.accounts.map((account, index) => (
                        <MenuItem value={account.id} key={index}>
                          {account.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>{allocation.description}</TableCell>
                  <TableCell>{allocation.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </StyledGrid>
    );
  }
}
