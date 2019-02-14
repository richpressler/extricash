import * as React from 'react';

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

interface SelectCSVColumnsProps {
  columnAssignments: string[];
  csv: Array<string>[];
  hasHeaderRow: boolean;
  onColumnAssigned: (columnNo: number, contentType: string) => void;
  onHasHeaderRowChanged: (newValue: boolean) => void;
}

export const SelectCSVColumns: React.SFC<SelectCSVColumnsProps> = props => {
  const firstRow = props.csv[0];
  const handleHasHeaderRowChanged = evt => props.onHasHeaderRowChanged(evt.target.checked);
  const getColumnAssignmentHandler = (columnNo: number) => {
    return evt => props.onColumnAssigned(columnNo, evt.target.value);
  };
  const isNumeric = val => !isNaN(Number(val));
  const fields = [
    {
      name: 'Date',
      value: 'date'
    },
    {
      name: 'Description',
      value: 'description'
    },
    {
      name: 'Location',
      value: 'location'
    },
    {
      name: 'Amount',
      value: 'amount'
    },
    {
      name: 'Debit',
      value: 'debit'
    },
    {
      name: 'Credit',
      value: 'credit'
    }
  ];

  return (
    <>
      <Typography gutterBottom color="textSecondary" align="center">
        Above each column, use the dropdown to select which column represents each field.
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={<Switch checked={props.hasHeaderRow} onChange={handleHasHeaderRowChanged} />}
          label="Has header row"
        />
      </FormGroup>
      <Table>
        <TableHead>
          <TableRow>
            {props.columnAssignments.map((contentType, index) => (
              <TableCell padding="dense" key={index}>
                <FormControl>
                  <Select value={contentType} onChange={getColumnAssignmentHandler(index)}>
                    <MenuItem value="none">
                      <em>Select</em>
                    </MenuItem>
                    {fields.map((field, index) => (
                      <MenuItem value={field.value} key={index}>
                        {field.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!props.hasHeaderRow ? (
            <TableRow>
              {firstRow.map((col, index) => (
                <TableCell numeric={isNumeric(col)} padding="dense" key={index}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          ) : null}
          {props.csv.slice(1, 5).map((row, index) => (
            <TableRow key={index}>
              {row.map((col, index) => (
                <TableCell numeric={isNumeric(col)} padding="dense" key={index}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
