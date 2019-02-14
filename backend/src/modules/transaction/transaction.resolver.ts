import { TransactionDAL } from './transaction.dal';
import { TransactionService } from './transaction.service';

export const TransactionResolvers = {
  Mutation: {
    createTransactions: async (parent, { input }, { me }) => {
      return await TransactionService.createTransactions(input);
    }
  },
  Query: {
    transaction: async (parent, { accountId }, { me }) => {
      return await TransactionDAL.find({ accountId });
    }
  }
};
