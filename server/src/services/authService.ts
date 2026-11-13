import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { type IUser } from '../models/User';

export async function registerUser(name: string, email: string, password: string): Promise<IUser> {
  const existing = await User.findOne({ email });
  if (existing) throw Object.assign(new Error('Email already registered'), { statusCode: 400 });

  const hashed = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashed, role: 'user' });
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: { id: string; name: string; email: string; role: string } }> {
  const user = await User.findOne({ email });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { statusCode: 401 });

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');

  const token = jwt.sign({ id: user._id.toString(), role: user.role }, secret, { expiresIn: '7d' });
  return {
    token,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
  };
}
