import { merge } from 'lodash';
import { AccountResolvers } from './modules/account';
import { UserResolvers } from './modules/user';
import { TransactionResolvers } from './modules/transaction';
import { GraphQLDateTime } from 'graphql-iso-date';

const CustomScalars = {
  DateTime: GraphQLDateTime
};

export default merge(
  {},
  CustomScalars,
  AccountResolvers,
  UserResolvers,
  TransactionResolvers
)