import gql from 'graphql-tag';

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