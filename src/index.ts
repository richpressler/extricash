import { config } from 'dotenv';
config();

import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

// Import DatabaseConnection just to establish Mongoose connection
import './database';
import resolvers from './resolvers';
import schema from './schema';

const PORT = process.env.port || 8000;

const app = express();

const exSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

const server = new ApolloServer({
  schema: exSchema
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});