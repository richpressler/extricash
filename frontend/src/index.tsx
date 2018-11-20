import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { App } from './components/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

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
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
