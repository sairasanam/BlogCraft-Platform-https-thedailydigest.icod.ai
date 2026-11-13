import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema);
