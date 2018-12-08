import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { extricashTheme } from './theme';

import { App } from './components/App';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = window.localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    }
  });

  return forward(operation);
})

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql'
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
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
