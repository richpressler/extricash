import { CreateTransactionInput, TransactionDAL } from './';
import { AccountDAL } from '../account';

export class TransactionService {
  public static async createTransactions(inputTransactions: CreateTransactionInput[]) {
    return await Promise.all(
      inputTransactions.map(async inputTransaction => {
        const transaction = (await TransactionDAL.create(inputTransaction)) as any;
        await AccountDAL.updateBalance(transaction.accountId, transaction.amount);
        return transaction;
      })
    );
  }
}
