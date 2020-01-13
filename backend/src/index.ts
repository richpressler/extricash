import { config } from 'dotenv';
config();

import { json } from 'body-parser';
import { renderFile } from 'ejs';
import express from 'express';
import { verify } from 'jsonwebtoken';
import logger from 'morgan';
import { resolve } from 'path';
import { AuthenticationError } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

// Import DatabaseConnection just to establish Mongoose connection
import './database';
import resolvers from './resolvers';
import schema from './schema';
import { User, UserService } from './modules/user';

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

export interface Context {
  me?: User
};

const server = new ApolloServer({
  schema: exSchema,
  formatError: err => {console.log(err); return err},
  context: async ({ req }) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    const context: Context = {};
    if (token) {
      try {
        const userData = await verify(token, process.env.JWT_SECRET);
        context.me = await UserService.getMe((userData as any).id);
      } catch (e) {
        throw new AuthenticationError(`JWT Error: ${e.message}`);
      }
    }
    return context;
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.get('*', (req, res) => res.render(distPath + '/index.html'));

app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});