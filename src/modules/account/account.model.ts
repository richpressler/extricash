import { Schema, model } from 'mongoose';

const AccountSchema = new Schema({
  name: String
});

export const AccountModel = model('Account', AccountSchema);