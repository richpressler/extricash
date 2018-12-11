import gql from 'graphql-tag';
import { Document } from 'mongoose';
import { Transaction } from '../transaction';

export const AccountSchema = gql`
  extend type Query {
    account(id: ID!): Account!
  }

  type Account {
    id: ID!
    name: String!
    balance: Float!

    transactions(orderBy: String, limit: Int): [Transaction]
  }
`;

export interface Account extends Document {
  id: string;
  name: string;
  balance: number;

  transactions: Transaction[]
}