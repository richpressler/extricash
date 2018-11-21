import { config } from 'dotenv';
config();

import * as express from 'express';
import { json } from 'body-parser';
import { renderFile } from 'ejs';
import * as logger from 'morgan';
import { resolve } from 'path';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

// Import DatabaseConnection just to establish Mongoose connection
import './database';
import resolvers from './resolvers';
import schema from './schema';

const PORT = process.env.port || 8000;
const distPath = resolve(__dirname, '../../frontend/dist');

console.log(`Serving static files from ${distPath}`);

const app = express();
app.use(json());
app.set('views', distPath);
app.engine('html', renderFile);
app.use(express.static(distPath));
app.use(logger('dev'));

const exSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

const server = new ApolloServer({
  schema: exSchema,
  formatError: err => {console.log(err); return err}
});

server.applyMiddleware({ app, path: '/graphql' });

app.get('*', (req, res) => res.render(distPath + '/index.html'));

app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});