import { gql } from 'apollo-server-express';

import { AccountSchema } from './modules/account';
import { UserSchema } from './modules/user';
import { TransactionSchema } from './modules/transaction';

const LinkSchema = gql`
  scalar DateTime
  
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
  LinkSchema,
  AccountSchema,
  UserSchema,
  TransactionSchema
];
