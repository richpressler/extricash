import { gql } from 'apollo-server-express';

import user from './user';
import account from './account';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  user,
  account
];