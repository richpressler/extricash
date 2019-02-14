import * as React from 'react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Button, Grid, Step, Stepper, StepLabel, Typography, withStyles } from '@material-ui/core';

import { Transaction } from '../../../backend/src/modules/transaction/transaction.schema';
import { CreateTransactionsMutation } from '../graphql/mutations';
import { meQuery } from '../graphql/queries';
import { SubmitMutationButton } from './SubmitMutationButton/SubmitMutationButton';
import { AllocateTransactions, FilterCSV, SelectCSVColumns, SelectTransactions, UploadCSV } from './ImportCSV';

enum ImportStep {
  UPLOAD = 'Upload CSV',
  SELECT_COLUMNS = 'Select Columns',
  FILTER = 'Filter Text',
  SELECT_TRANSACTIONS = 'Select Transactions',
  ALLOCATE_TRANSACTIONS = 'Allocate Transactions'
}

export interface Allocation {
  accountId: string;
  description: string;
}

interface ImportPageState {
  step: ImportStep;
  parsedCSV?: string[][];
  hasHeaderRow: boolean;
  columnAssignments: string[];
  locationFilters: string[];
  selectedTransactionIndexes: number[];
  transactionAllocations: Allocation[];
}

const StyledStepper = withStyles({
  root: {
    marginBottom: '15px'
  }
})(Stepper);

const steps = [
  ImportStep.UPLOAD,
  ImportStep.SELECT_COLUMNS,
  ImportStep.FILTER,
  ImportStep.SELECT_TRANSACTIONS,
  ImportStep.ALLOCATE_TRANSACTIONS
];

class BaseImportPage extends React.Component<RouteComponentProps, ImportPageState> {
  state: ImportPageState = {
    hasHeaderRow: false,
    step: ImportStep.UPLOAD,
    columnAssignments: [],
    locationFilters: [],
    selectedTransactionIndexes: [],
    transactionAllocations: []
  };

  private handleCSVUploaded = parsedCSV => {
    const allocations = parsedCSV.map(row => ({
      accountId: 'none',
      description: ''
    }));

    this.setState({
      transactionAllocations: allocations,
      parsedCSV,
      step: ImportStep.SELECT_COLUMNS,
      columnAssignments: parsedCSV[0].map(() => 'none')
    });
  };

  private handleHasHeaderRowChanged = (hasHeaderRow: boolean) => {
    this.setState({ hasHeaderRow });
  };

  private handleColumnAssignmentSet = (columnNo: number, contentType: string) => {
    const columnAssignments = this.state.columnAssignments.slice();
    columnAssignments[columnNo] = contentType;
    this.setState({ columnAssignments });
  };

  private handleBackClicked = () => {
    this.setState({ step: steps[steps.indexOf(this.state.step) - 1] });
  };

  private handleNextClicked = () => {
    this.setState({ step: steps[steps.indexOf(this.state.step) + 1] });
  };

  private handleFilterAdded = (filter: string) => {
    const locationFilters = this.state.locationFilters.slice();
    locationFilters.push(filter);
    this.setState({ locationFilters });
  };

  private handleFilterRemoved = (filter: string) => {
    const locationFilters = this.state.locationFilters.slice();
    locationFilters.splice(locationFilters.indexOf(filter), 1);
    this.setState({ locationFilters });
  };

  private handleRowSelected = (index: number) => {
    if (this.state.selectedTransactionIndexes.length === 0) {
      // This is the start row being selected
      this.setState({ selectedTransactionIndexes: [index] });
    } else if (this.state.selectedTransactionIndexes.length === 1) {
      // This is the end row being selected
      const newTransactions = [this.state.selectedTransactionIndexes[0]];
      for (let i = newTransactions[0] + 1; i <= index; i++) {
        newTransactions.push(i);
      }
      this.setState({ selectedTransactionIndexes: newTransactions });
    }
  };

  private handleRowRemoved = (index: number) => {
    const selectedTransactionIndexes = this.state.selectedTransactionIndexes.slice(0);
    selectedTransactionIndexes.splice(selectedTransactionIndexes.indexOf(index), 1);
    this.setState({ selectedTransactionIndexes });
  };

  private handleRowAdded = (index: number) => {
    const selectedTransactionIndexes = this.state.selectedTransactionIndexes.slice(0);
    selectedTransactionIndexes.push(index);
    this.setState({ selectedTransactionIndexes });
  };

  private handleAccountSelected = (index: number, accountId: string) => {
    const transactionAllocations = this.state.transactionAllocations.slice(0);
    transactionAllocations[index].accountId = accountId;
    this.setState({ transactionAllocations });
  };

  private handleDescriptionEntered = (index: number, description: string) => {
    const transactionAllocations = this.state.transactionAllocations.slice(0);
    transactionAllocations[index].description = description;
    this.setState({ transactionAllocations });
  };

  private handleUploadClicked = () => {
    const input = this.state.parsedCSV.reduce((rows: Transaction[], row: string[], index: number) => {
      if (this.state.selectedTransactionIndexes.indexOf(index) !== -1) {
        const allocationData = this.state.transactionAllocations[index];
        const columnAssignments = this.state.columnAssignments;
        const dateIndex = columnAssignments.indexOf('date');
        const debitIndex = columnAssignments.indexOf('debit');
        const creditIndex = columnAssignments.indexOf('credit');
        const locationIndex = columnAssignments.indexOf('location');
        rows.push({
          accountId: allocationData.accountId,
          amount: 0 - Math.abs(Number(row[debitIndex])) + Math.abs(Number(row[creditIndex])),
          date: new Date(row[dateIndex]),
          description: allocationData.description,
          location: this.filterLocation(row[locationIndex], this.state.locationFilters)
        });
      }

      return rows;
    }, []);

    return { input };
  };

  private filterLocation = (text: string, filters: string[]) => {
    return filters.reduce((processedString, filter) => {
      const index = processedString.toLowerCase().indexOf(filter.toLowerCase());
      if (index > -1) {
        return processedString.slice(0, index) + processedString.slice(index + filter.length).trim();
      }

      return processedString;
    }, text);
  };

  private handleSubmitSuccess = () => this.props.history.push('/dashboard/overview');

  render() {
    return (
      <Mutation mutation={CreateTransactionsMutation}>
        {mutationFunc => (
          <Query query={meQuery}>
            {({ data, loading }) =>
              loading ? null : (
                <>
                  <StyledStepper activeStep={steps.indexOf(this.state.step)}>
                    {steps.map((label: string) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </StyledStepper>
                  <Grid container>
                    <Grid item>
                      {this.state.step !== ImportStep.UPLOAD && (
                        <Button variant="contained" onClick={this.handleBackClicked}>
                          Back
                        </Button>
                      )}
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h3" align="center">
                        {this.state.step}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {this.state.step !== ImportStep.UPLOAD && steps.indexOf(this.state.step) !== steps.length - 1 ? (
                        <Button variant="contained" color="primary" onClick={this.handleNextClicked}>
                          Next
                        </Button>
                      ) : null}
                      {this.state.step !== ImportStep.UPLOAD && steps.indexOf(this.state.step) === steps.length - 1 ? (
                        <SubmitMutationButton
                          preSubmit={this.handleUploadClicked}
                          mutation={mutationFunc}
                          postSubmit={this.handleSubmitSuccess}
                        >
                          Upload
                        </SubmitMutationButton>
                      ) : null}
                    </Grid>
                  </Grid>
                  {this.state.step === ImportStep.UPLOAD ? <UploadCSV onCSVUploaded={this.handleCSVUploaded} /> : null}
                  {this.state.step === ImportStep.SELECT_COLUMNS ? (
                    <SelectCSVColumns
                      columnAssignments={this.state.columnAssignments}
                      hasHeaderRow={this.state.hasHeaderRow}
                      onHasHeaderRowChanged={this.handleHasHeaderRowChanged}
                      onColumnAssigned={this.handleColumnAssignmentSet}
                      csv={this.state.parsedCSV}
                    />
                  ) : null}
                  {this.state.step === ImportStep.FILTER ? (
                    <FilterCSV
                      csv={this.state.parsedCSV}
                      filters={this.state.locationFilters}
                      hasHeaderRow={this.state.hasHeaderRow}
                      locationColumnNumber={this.state.columnAssignments.indexOf('location')}
                      onFilterAdded={this.handleFilterAdded}
                      onFilterRemoved={this.handleFilterRemoved}
                    />
                  ) : null}
                  {this.state.step === ImportStep.SELECT_TRANSACTIONS ? (
                    <SelectTransactions
                      columnAssignments={this.state.columnAssignments}
                      csv={this.state.parsedCSV}
                      hasHeaderRow={this.state.hasHeaderRow}
                      selectedTransactionIndexes={this.state.selectedTransactionIndexes}
                      onRowClicked={this.handleRowSelected}
                      onRowAdded={this.handleRowAdded}
                      onRowRemoved={this.handleRowRemoved}
                    />
                  ) : null}
                  {this.state.step === ImportStep.ALLOCATE_TRANSACTIONS ? (
                    <AllocateTransactions
                      accounts={data.me.accounts}
                      columnAssignments={this.state.columnAssignments}
                      csv={this.state.parsedCSV}
                      hasHeaderRow={this.state.hasHeaderRow}
                      selectedTransactionIndexes={this.state.selectedTransactionIndexes}
                      transactionAllocations={this.state.transactionAllocations}
                      onAccountSelected={this.handleAccountSelected}
                      onDescriptionEntered={this.handleDescriptionEntered}
                    />
                  ) : null}
                </>
              )
            }
          </Query>
        )}
      </Mutation>
    );
  }
}

export const ImportPage = withRouter(BaseImportPage);
