import gql from 'graphql-tag';
import { Transaction } from '../transaction';

export const AccountSchema = gql`
  extend type Query {
    account(id: ID!): Account!
  }

  type Account {
    id: ID!
    name: String!

    transactions: [Transaction]
  }
`;

export interface Account {
  id: string,
  name: string,

  transactions: Transaction[]
}