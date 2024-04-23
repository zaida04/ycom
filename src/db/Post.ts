import mongoose, { Schema } from 'mongoose';

export interface IPost {
    _id: string;
    title: string;
    content: string;
    author_id: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
interface IPostDocument extends Omit<IPost, "_id">, mongoose.Document { }

const PostSchema: Schema = new Schema<IPostDocument>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Post: mongoose.Model<IPostDocument> = mongoose.models.Post || mongoose.model<IPostDocument>('Post', PostSchema);

export default Post;
