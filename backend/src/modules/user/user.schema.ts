import gql from 'graphql-tag';

export const UserSchema = gql`
  extend type Query {
    me: User!
    user(id: ID!): User!
    users: [User!]!
  }

  type CSVSettings {
    columnAssignments:  [Int!]!
    hasHeaderRow:       Boolean!
    locationFilters:    [String]
  }

  type User {
    id: ID!
    username: String!
    csvSettings: CSVSettings

    accounts: [Account]!
  }
`;