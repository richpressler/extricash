import { TransactionDAL } from "./transaction.dal";


export const TransactionResolvers = {
  Query: {
    transaction: async (parent, { accountId }, { me }) => {
      return await TransactionDAL.find({ accountId });
    }
  }
};