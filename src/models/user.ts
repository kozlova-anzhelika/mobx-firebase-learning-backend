import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
      unique: false,
    },
    confirmationCode: {
      type: String,
      required: false,
      unique: false,
    },
  },
  {
    versionKey: false,
  },
);

const User = model<UserDocument>('User', UserSchema);

export default User;
