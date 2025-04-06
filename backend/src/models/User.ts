import { Schema, model, Document } from 'mongoose';

export type Role = 'admin' | 'verifier';

export interface IUser extends Document {
  email: string;
  password: string;
  role: Role;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'verifier'], required: true },
});

export const User = model<IUser>('User', userSchema);