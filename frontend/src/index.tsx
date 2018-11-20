import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { App } from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3366cc'
    },
    secondary: {
      main: '#78909C'
    },
  }
});

render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
