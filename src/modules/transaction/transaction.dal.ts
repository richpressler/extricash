import { DAL } from '../../classes/base.dal';
import { TransactionModel } from './transaction.model';

export class TransactionDAL extends DAL {
  protected static model = TransactionModel;
}