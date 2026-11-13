import type { Request, Response, NextFunction } from 'express';
import * as contactService from '../services/contactService';

export async function createContactMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, subject, message } = req.body;
    const contactMsg = await contactService.createContactMessage(name, email, subject, message);
    res.status(201).json({ success: true, data: contactMsg });
  } catch (err) {
    next(err);
  }
}

export async function getContactMessages(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const messages = await contactService.getContactMessages();
    res.json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
}
