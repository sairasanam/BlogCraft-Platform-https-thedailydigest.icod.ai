import type { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/categoryService';

export async function getCategories(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const categories = await categoryService.getCategories();
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
}

export async function getCategoryBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const category = await categoryService.getCategoryBySlug(req.params.slug);
    if (!category) {
      res.status(404).json({ success: false, error: 'Category not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, slug, description } = req.body;
    const category = await categoryService.createCategory(name, slug, description || '');
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    if (!category) {
      res.status(404).json({ success: false, error: 'Category not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Category not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
}
