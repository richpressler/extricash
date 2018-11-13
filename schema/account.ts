import gql from 'graphql-tag';

export default gql`
  extend type Query {
    account: Account!
  }

  type Account {
    id: ID!
    name: String!
  }
`;