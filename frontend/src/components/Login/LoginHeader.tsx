import { CardHeader, withStyles } from '@material-ui/core'
import { TextAlignProperty } from 'csstype';

const cardHeaderStyles = {
  root: {
    backgroundColor: '#78909C'
  },
  title: {
    color: 'white',
    textAlign: 'center' as TextAlignProperty
  }
};

export const LoginCardHeader = withStyles(cardHeaderStyles)(CardHeader);