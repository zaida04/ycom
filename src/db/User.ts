import mongoose, { Schema, Document } from 'mongoose';

// This is for typescript
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    salt: string;
    authenticationToken: string;
    refreshToken: string;
    updatedAt: Date;
}

// This is for mongodb to know what we are storing
const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;