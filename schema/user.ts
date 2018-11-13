import gql from 'graphql-tag';

export default gql`
  extend type Query {
    me: User!
  }

  type User {
    id: ID!
    username: String!
  }
`;