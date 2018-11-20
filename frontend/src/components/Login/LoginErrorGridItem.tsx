import { Grid, withStyles } from '@material-ui/core';
import { TextAlignProperty } from 'csstype';

const errorStyles = {
  item: {
    color: 'red',
    textAlign: 'center' as TextAlignProperty,
    fontFamily: 'Roboto'
  }
};

export const LoginErrorGridItem = withStyles(errorStyles)(Grid);