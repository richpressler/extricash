import { Schema, model } from 'mongoose';

const CSVSettingsSchema = new Schema({
  columnAssignments:  [Number],
  hasHeaderRow:       Boolean,
  locationFilters:    [String]
});

const UserSchema = new Schema({
  username:       String,
  password:       String,
  csvSettings:    CSVSettingsSchema
});

export const UserModel = model('User', UserSchema);