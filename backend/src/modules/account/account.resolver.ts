import { AccountModel } from './account.model';
import { TransactionDAL } from '../transaction';

export const AccountResolvers = {
  Query: {
    account: (parent, { id }, { me }) => {
      return AccountModel.findById(id);
    },
    accounts: (parent, args, { me }) => {
      return AccountModel.find({ _id: { $in: me.accounts } });
    }
  },
  Account: {
    transactions: async (parent, { limit, orderBy }) => {
      return await TransactionDAL.find(
        {
          accountId: parent.id
        },
        {
          limit,
          orderBy
        }
      );
    }
  }
};
