import { Router } from 'express';
import * as subscriberController from '../controllers/subscriberController';
import { authenticate, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public route
router.post('/', subscriberController.subscribe);

// Admin routes
router.get('/', authenticate, requireAdmin, subscriberController.getSubscribers);
router.delete('/:id', authenticate, requireAdmin, subscriberController.deleteSubscriber);

export default router;
