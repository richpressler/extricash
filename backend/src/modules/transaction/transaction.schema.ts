import gql from 'graphql-tag';

export const TransactionSchema = gql`
  input CreateTransactionInput {
    accountId: String!
    date: DateTime!
    amount: Float!
    description: String
    location: String
  }

  extend type Query {
    transaction(accountId: ID!): [Transaction!]
  }

  extend type Mutation {
    createTransactions(input: [CreateTransactionInput!]!): [Transaction!]!
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

export interface CreateTransactionInput {
  accountId: string;
  date: Date;
  amount: number;
  description?: string;
  location?: string;
}

export interface Transaction {
  id?: string;
  accountId: string;
  date: Date;
  amount: number;
  description: string;
  location: string;
}
