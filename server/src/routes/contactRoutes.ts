import { Router } from 'express';
import * as contactController from '../controllers/contactController';
import { authenticate, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public route
router.post('/', contactController.createContactMessage);

// Admin routes
router.get('/', authenticate, requireAdmin, contactController.getContactMessages);

export default router;
