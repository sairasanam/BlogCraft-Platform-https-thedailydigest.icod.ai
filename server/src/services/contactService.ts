import ContactMessage, { type IContactMessage } from '../models/ContactMessage';

export async function createContactMessage(name: string, email: string, subject: string, message: string): Promise<IContactMessage> {
  return ContactMessage.create({ name, email, subject, message });
}

export async function getContactMessages(): Promise<IContactMessage[]> {
  return ContactMessage.find().sort({ createdAt: -1 });
}
