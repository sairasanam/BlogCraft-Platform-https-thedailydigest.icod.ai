import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: mongoose.Types.ObjectId;
  publishedAt: Date | null;
  status: 'draft' | 'published' | 'scheduled';
  views: number;
}

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: '' },
    featuredImage: { type: String, default: '' },
    author: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    publishedAt: { type: Date, default: null },
    status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model<IArticle>('Article', articleSchema);
