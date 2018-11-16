import { UserDAL } from './user.dal';
import { AccountDAL } from '../account';

export const UserResolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return {
        id: 1,
        username: 'rmpressler'
      }
    },
    users: async (parent, args, { me }) => {
      // return await UserDAL.find();
      return [];
    },
    user: async (parent, { id }, { me }) => {
      return await UserDAL.findById(id);
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