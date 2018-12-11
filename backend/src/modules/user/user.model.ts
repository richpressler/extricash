import { Schema, model } from 'mongoose';

const CSVSettingsSchema = new Schema({
  columnAssignments:  [Number],
  hasHeaderRow:       Boolean,
  locationFilters:    [String]
});

const BillSchema = new Schema({
  dayOfMonth:   Number,
  amount:       Number,
  name:         String
});

const UserSchema = new Schema({
  username:       String,
  password:       String,
  email:          String,
  createdDate:    Date,
  csvSettings:    CSVSettingsSchema,
  bills:          [BillSchema],
  monthlyIncome:  Number
});

export const UserModel = model('User', UserSchema);