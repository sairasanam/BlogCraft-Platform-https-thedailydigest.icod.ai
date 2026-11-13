import type { Request, Response, NextFunction } from 'express';
import * as articleService from '../services/articleService';

export async function getArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { search, category, status, page, limit } = req.query;
    const result = await articleService.getArticles({
      search: search as string,
      category: category as string,
      status: status as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function getArticleBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const article = await articleService.getArticleBySlug(req.params.slug);
    if (!article) {
      res.status(404).json({ success: false, error: 'Article not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: article });
  } catch (err) {
    next(err);
  }
}

export async function getArticleById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
      res.status(404).json({ success: false, error: 'Article not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: article });
  } catch (err) {
    next(err);
  }
}

export async function createArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const file = req.file as Express.Multer.File | undefined;
    const featuredImage = file ? `uploads/${file.filename}` : '';
    const article = await articleService.createArticle({ ...req.body, featuredImage });
    res.status(201).json({ success: true, data: article });
  } catch (err) {
    next(err);
  }
}

export async function updateArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const file = req.file as Express.Multer.File | undefined;
    const featuredImage = file ? `uploads/${file.filename}` : undefined;
    const updateData: Record<string, unknown> = { ...req.body };
    if (featuredImage) updateData.featuredImage = featuredImage;
    const article = await articleService.updateArticle(req.params.id, updateData);
    if (!article) {
      res.status(404).json({ success: false, error: 'Article not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: article });
  } catch (err) {
    next(err);
  }
}

export async function deleteArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await articleService.deleteArticle(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Article not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, message: 'Article deleted' });
  } catch (err) {
    next(err);
  }
}

export async function getRelatedArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const articles = await articleService.getRelatedArticles(req.params.categoryId, req.params.excludeId);
    res.json({ success: true, data: articles });
  } catch (err) {
    next(err);
  }
}

export async function getPopularArticles(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const articles = await articleService.getPopularArticles();
    res.json({ success: true, data: articles });
  } catch (err) {
    next(err);
  }
}

export async function getFeaturedArticle(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const article = await articleService.getFeaturedArticle();
    res.json({ success: true, data: article });
  } catch (err) {
    next(err);
  }
}

export async function getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const totalViews = await articleService.getTotalViews();
    res.json({ success: true, data: { totalViews } });
  } catch (err) {
    next(err);
  }
}
