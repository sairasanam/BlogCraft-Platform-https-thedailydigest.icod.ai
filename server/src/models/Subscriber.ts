import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
}

const subscriberSchema = new Schema<ISubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model<ISubscriber>('Subscriber', subscriberSchema);
