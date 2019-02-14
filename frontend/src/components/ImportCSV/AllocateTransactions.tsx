import * as React from 'react';
import { MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';

import { Account } from '../../../../backend/src/modules/account';
import { Allocation } from '../ImportPage';

interface AllocateTransactionsProps {
  accounts: Account[];
  columnAssignments: string[];
  csv: string[][];
  hasHeaderRow: boolean;
  selectedTransactionIndexes: number[];
  transactionAllocations: Allocation[];
  onAccountSelected: (transactionIndex: number, accountId: string) => void;
  onDescriptionEntered: (transactionIndex: number, description: string) => void;
}

export const AllocateTransactions: React.SFC<AllocateTransactionsProps> = props => {
  const compressedAssignments = props.columnAssignments.reduce((assignments: string[], assignment: string) => {
    if (assignment !== 'none') {
      assignments.push(assignment);
    }

    return assignments;
  }, []);
  const compressedCSV = props.csv.map((row: string[]) => {
    return row.reduce((newRow: string[], column: string, index: number) => {
      if (props.columnAssignments[index] !== 'none') {
        newRow.push(column);
      }

      return newRow;
    }, []);
  });

  const getColumnAssignmentHandler = (index: number) => {
    return evt => props.onAccountSelected(index, evt.target.value);
  };

  const getDescriptionEnteredHandler = (index: number) => {
    return evt => props.onDescriptionEntered(index, evt.target.value);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {compressedAssignments.map((columnHeader: string, index: number) => (
            <TableCell key={index}>{columnHeader}</TableCell>
          ))}
          <TableCell>Account</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {compressedCSV.map((row: string[], index: number) =>
          (!props.hasHeaderRow || index > 0) && props.selectedTransactionIndexes.indexOf(index) !== -1 ? (
            <TableRow key={index}>
              {row.map((column: string, i: number) => (
                <TableCell key={i}>{column}</TableCell>
              ))}
              <TableCell>
                <Select
                  value={props.transactionAllocations[index].accountId}
                  onChange={getColumnAssignmentHandler(index)}
                >
                  <MenuItem value="none">
                    <em>Select</em>
                  </MenuItem>
                  {props.accounts.map((account: Account, i: number) => (
                    <MenuItem value={account.id} key={i}>
                      {account.name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField
                  value={props.transactionAllocations[index].description}
                  onChange={getDescriptionEnteredHandler(index)}
                />
              </TableCell>
            </TableRow>
          ) : null
        )}
      </TableBody>
    </Table>
  );
};
