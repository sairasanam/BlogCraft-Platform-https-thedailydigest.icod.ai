import type { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({ success: true, data: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
