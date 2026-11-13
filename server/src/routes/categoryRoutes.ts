import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { authenticate, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:slug', categoryController.getCategoryBySlug);

// Admin routes
router.post('/', authenticate, requireAdmin, categoryController.createCategory);
router.put('/:id', authenticate, requireAdmin, categoryController.updateCategory);
router.delete('/:id', authenticate, requireAdmin, categoryController.deleteCategory);

export default router;
