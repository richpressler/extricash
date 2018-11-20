import { DAL } from '../../classes/base.dal';
import { AccountModel } from './account.model';

export class AccountDAL extends DAL {
  protected static model = AccountModel;
  }
