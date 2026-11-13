import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolves __dirname in ES modules and loads .env from project root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorMiddleware';
import { UPLOADS_DIR } from './paths';
import { seedDatabase } from './services/seedService';

// ─── Route Imports ────────────────────────────────────────────────────────────
import authRoutes from './routes/authRoutes';
import articleRoutes from './routes/articleRoutes';
import categoryRoutes from './routes/categoryRoutes';
import commentRoutes from './routes/commentRoutes';
import subscriberRoutes from './routes/subscriberRoutes';
import contactRoutes from './routes/contactRoutes';

// ─── Config ───────────────────────────────────────────────────────────────────
const app = express();
const PORT: number = Number(process.env.PORT) || 5000;
const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/my_db';

// ─── CORS ─────────────────────────────────────────────────────────────────────
let apiOrigin: string | null = null;
try {
  if (process.env.VITE_API_URL) apiOrigin = new URL(process.env.VITE_API_URL).origin;
} catch {
  // VITE_API_URL missing or not a valid URL — leave null (localhost-only below).
}
const corsOrigins: (string | RegExp)[] = [/^http:\/\/localhost:\d+$/];
if (apiOrigin) corsOrigins.push(apiOrigin);

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json());

// ─── Static Uploads ───────────────────────────────────────────────────────────
app.use('/api/uploads', express.static(UPLOADS_DIR));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req: Request, res: Response) =>
  res.json({ success: true, message: 'Server is running' })
);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/contact', contactRoutes);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── DB + Server Bootstrap ────────────────────────────────────────────────────
async function start(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[DB] Connected to MongoDB');

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`[SERVER] Running on port ${PORT}`);
    });
  } catch (err) {
    console.error('[STARTUP] Failed to start server:', err);
    process.exit(1);
  }
}

start();
