import Subscriber, { type ISubscriber } from '../models/Subscriber';

export async function subscribe(email: string): Promise<ISubscriber> {
  const existing = await Subscriber.findOne({ email });
  if (existing) throw Object.assign(new Error('Email already subscribed'), { statusCode: 400 });
  return Subscriber.create({ email });
}

export async function getSubscribers(): Promise<ISubscriber[]> {
  return Subscriber.find().sort({ createdAt: -1 });
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  const result = await Subscriber.findByIdAndDelete(id);
  return !!result;
}
