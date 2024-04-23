import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
    user_id: string;
    token: string;
}

const SessionSchema: Schema = new Schema({
    user_id: { type: String, required: true },
    token: { type: String, required: true, unique: true }
});

const Session = mongoose.models.Session ?? mongoose.model<ISession>('Session', SessionSchema);

export default Session;