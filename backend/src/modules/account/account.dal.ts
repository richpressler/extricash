import { DAL } from '../../classes/base.dal';
import { AccountModel } from './account.model';

export class AccountDAL extends DAL {
  protected static model = AccountModel;

  public static async updateBalance(id: string, amount: number) {
    return AccountModel.findOneAndUpdate({ _id: id }, { $inc: { balance: amount } })
      .lean()
      .exec();
  }
}
