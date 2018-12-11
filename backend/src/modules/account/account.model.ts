import { Schema, model } from 'mongoose';

const AccountSchema = new Schema({
  name: String,
  balance: Number
});

export const AccountModel = model('Account', AccountSchema);