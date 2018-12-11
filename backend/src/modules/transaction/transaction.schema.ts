import gql from 'graphql-tag';
import { Document } from 'mongoose';

export const TransactionSchema = gql`
  extend type Query {
    transaction(accountId: ID!): [Transaction!]
  }

  type Transaction {
    id: ID!
    accountId: String!
    date: DateTime!
    amount: Float!
    description: String
    location: String
  }
`;

export interface Transaction extends Document {
  id: string;
  accountId: string;
  date: Date;
  amount: number;
  description: string;
  location: string;
}