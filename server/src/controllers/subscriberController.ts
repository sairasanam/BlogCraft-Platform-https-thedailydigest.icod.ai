import type { Request, Response, NextFunction } from 'express';
import * as subscriberService from '../services/subscriberService';

export async function subscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email } = req.body;
    const subscriber = await subscriberService.subscribe(email);
    res.status(201).json({ success: true, data: subscriber });
  } catch (err) {
    next(err);
  }
}

export async function getSubscribers(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const subscribers = await subscriberService.getSubscribers();
    res.json({ success: true, data: subscribers });
  } catch (err) {
    next(err);
  }
}

export async function deleteSubscriber(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await subscriberService.deleteSubscriber(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Subscriber not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, message: 'Subscriber removed' });
  } catch (err) {
    next(err);
  }
}
