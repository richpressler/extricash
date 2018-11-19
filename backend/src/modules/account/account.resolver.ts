import { AccountModel } from './account.model';

export const AccountResolvers = {
  Query: {
    account: (parent, { id }, { me }) => {
      return AccountModel.findById(id);
    }
  }
};