import { Router } from 'express';
import * as commentController from '../controllers/commentController';
import { authenticate, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public route - get approved comments for an article
router.get('/article/:articleId', commentController.getComments);

// Admin routes
router.get('/', authenticate, requireAdmin, commentController.getAllComments);
router.post('/', commentController.createComment);
router.patch('/:id/approve', authenticate, requireAdmin, commentController.approveComment);
router.delete('/:id', authenticate, requireAdmin, commentController.deleteComment);

export default router;
