import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { extricashTheme } from './theme';

import { App } from './components/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

render(
  <BrowserRouter>
    <MuiThemeProvider theme={extricashTheme}>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
