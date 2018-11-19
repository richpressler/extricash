import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
  date: Date,
  accountId: Schema.Types.ObjectId,
  amount: Number,
  location: String,
  description: String
});

export const TransactionModel = model('Transaction', TransactionSchema);