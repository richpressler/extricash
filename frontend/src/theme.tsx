import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export interface ExtricashThemeOptions extends ThemeOptions {
  layout: {
    drawerWidth: number
  }
}

export const extricashTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3366cc'
    },
    secondary: {
      main: '#78909C'
    },
    type: 'dark'
  },
  layout: {
    drawerWidth: 200
  }
} as ThemeOptions);