import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  articleId: mongoose.Types.ObjectId;
  author: string;
  email: string;
  content: string;
  approved: boolean;
}

const commentSchema = new Schema<IComment>(
  {
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    author: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model<IComment>('Comment', commentSchema);
