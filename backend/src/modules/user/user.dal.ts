import { DAL } from '../../classes/base.dal';
import { UserModel } from './user.model';

export class UserDAL extends DAL {
  protected static model = UserModel;
  }
