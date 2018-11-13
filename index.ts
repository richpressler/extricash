import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';

const PORT = process.env.port || 8000;

const app = express();

import resolvers from './resolvers';
import schema from './schema';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});