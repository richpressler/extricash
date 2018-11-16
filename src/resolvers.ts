import { merge } from 'lodash';
import { AccountResolvers } from './modules/account';
import { UserResolvers } from './modules/user';
import { TransactionResolvers } from './modules/transaction';

export default merge(
  {},
  AccountResolvers,
  UserResolvers,
  TransactionResolvers
)