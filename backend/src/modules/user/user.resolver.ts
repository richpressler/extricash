import { UserService } from './';
import { AccountDAL } from '../account';
import { AuthenticationError } from 'apollo-server';

export const UserResolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me || new AuthenticationError('Not logged in.');
    }
  },
  Mutation: {
    register: async (parent, args) => {
      return await UserService.register(args);
    },
    login: async (parent, args) => {
      return await UserService.login(args);
    }
  },
  User: {
    accounts: async (parent) => {
      return await AccountDAL.find(
      {
        _id: { 
          $in: parent.accounts 
        }
      },
      {
        orderBy: 'name'
      });
    }
  }
};