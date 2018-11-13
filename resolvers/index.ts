import { merge } from 'lodash';

import user from './user';
import account from './account';

export default merge(
  {},
  user,
  account
);