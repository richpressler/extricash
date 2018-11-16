import gql from 'graphql-tag';

export const AccountSchema = gql`
  extend type Query {
    account(id: ID!): Account!
  }

  type Account {
    id: ID!
    name: String!
  }
`;