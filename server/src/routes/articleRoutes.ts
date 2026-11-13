import { Router } from 'express';
import * as articleController from '../controllers/articleController';
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

// Public routes
router.get('/', articleController.getArticles);
router.get('/popular', articleController.getPopularArticles);
router.get('/featured', articleController.getFeaturedArticle);
router.get('/related/:categoryId/:excludeId', articleController.getRelatedArticles);
router.get('/:slug', articleController.getArticleBySlug);

// Admin routes
router.get('/admin/stats', authenticate, requireAdmin, articleController.getStats);
router.get('/admin/:id', authenticate, requireAdmin, articleController.getArticleById);
router.post('/', authenticate, requireAdmin, upload.single('featuredImage'), (req, res, next) => articleController.createArticle(req, res, next));
router.put('/:id', authenticate, requireAdmin, upload.single('featuredImage'), (req, res, next) => articleController.updateArticle(req, res, next));
router.delete('/:id', authenticate, requireAdmin, (req, res, next) => articleController.deleteArticle(req, res, next));

export default router;
