import gql from 'graphql-tag';
import { Document } from 'mongoose';

import { Account } from '../account';

export const UserSchema = gql`
  extend type Query {
    me: User!
  }

  extend type Mutation {
    register(username: String!, email: String!, password: String!): Token!
    login(username: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }

  type CSVSettings {
    columnAssignments:  [Int!]!
    hasHeaderRow:       Boolean!
    locationFilters:    [String]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    createdDate: DateTime!
    csvSettings: CSVSettings

    accounts: [Account]!
  }
`;

export interface User extends Document {
  id: string;
  username: string
  email: string
  createdDate: Date | string
  csvSettings: {
    columnAssignments:  number[]
    hasHeaderRow:       boolean
    locationFilters:    string[]
  }

  accounts: Account[]
}