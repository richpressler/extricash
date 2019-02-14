import * as React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

interface SelectTransactionProps {
  columnAssignments: string[];
  csv: string[][];
  hasHeaderRow: boolean;
  selectedTransactionIndexes: number[];
  onRowClicked: (index: number) => void;
  onRowAdded: (index: number) => void;
  onRowRemoved: (index: number) => void;
}

const selectedRowStyle = {
  backgroundColor: 'green'
};

export const SelectTransactions: React.SFC<SelectTransactionProps> = props => {
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

  const getRowClickedHandler = (index: number) => {
    return () => props.onRowClicked(index);
  };

  const getRemoveButtonClickedHandler = (index: number) => {
    return () => props.onRowRemoved(index);
  };

  const getAddButtonClickedHandler = (index: number) => {
    return () => props.onRowAdded(index);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {compressedAssignments.map((columnHeader: string, index: number) => (
            <TableCell key={index}>{columnHeader}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {compressedCSV.map((row: string[], index: number) =>
          !props.hasHeaderRow || index > 0 ? (
            <TableRow
              key={index}
              style={props.selectedTransactionIndexes.indexOf(index) !== -1 ? selectedRowStyle : {}}
              onClick={getRowClickedHandler(index)}
            >
              {row.map((column: string, i: number) => (
                <TableCell key={i}>{column}</TableCell>
              ))}
              {props.selectedTransactionIndexes.length > 1 ? (
                <TableCell>
                  {props.selectedTransactionIndexes.indexOf(index) !== -1 ? (
                    <Button variant="contained" color="primary" onClick={getRemoveButtonClickedHandler(index)}>
                      Deselect
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" onClick={getAddButtonClickedHandler(index)}>
                      Select
                    </Button>
                  )}
                </TableCell>
              ) : null}
            </TableRow>
          ) : null
        )}
      </TableBody>
    </Table>
  );
};
