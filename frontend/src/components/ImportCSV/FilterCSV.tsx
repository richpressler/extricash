import * as React from 'react';

import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';

interface FilterCSVProps {
  csv: string[][];
  filters: string[];
  hasHeaderRow: boolean;
  locationColumnNumber: number;
  onFilterAdded: (filter: string) => void;
  onFilterRemoved: (filter: string) => void;
}

export const FilterCSV: React.SFC<FilterCSVProps> = props => {
  const handleFormSubmitted = evt => {
    evt.preventDefault();
    const input = document.getElementById('newFilter') as any;
    props.onFilterAdded(input.value);
    input.value = '';
  };

  return (
    <Grid container spacing={16}>
      <Grid item sm>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.csv.map((row, index) =>
              !props.hasHeaderRow || index > 0 ? (
                <TableRow key={index}>
                  <TableCell>{row[props.locationColumnNumber]}</TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </Grid>
      <Grid item sm>
        <form onSubmit={handleFormSubmitted}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Filtered Text</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField id="newFilter" label="New Filter" type="text" name="newFilter" />
                </TableCell>
                <TableCell>
                  <Button type="submit" variant="contained" color="primary">
                    Add
                  </Button>
                </TableCell>
              </TableRow>
              {props.filters.map((filter, index) => (
                <TableRow key={filter}>
                  <TableCell>{filter}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => props.onFilterRemoved(filter)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </Grid>
    </Grid>
  );
};
