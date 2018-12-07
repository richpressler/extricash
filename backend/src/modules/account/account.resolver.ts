import { AccountModel } from './account.model';
import { TransactionDAL } from '../transaction';

export const AccountResolvers = {
  Query: {
    account: (parent, { id }, { me }) => {
      return AccountModel.findById(id);
    }
  },
  Account: {
    transactions: async (parent) => {
      return await TransactionDAL.find(
        {
          accountId: parent.id
        }
      );
    }
  }
};