import type { Request, Response, NextFunction } from 'express';
import * as commentService from '../services/commentService';

export async function getComments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const comments = await commentService.getComments(req.params.articleId, true);
    res.json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
}

export async function getAllComments(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const comments = await commentService.getAllComments();
    res.json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
}

export async function createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { articleId, author, email, content } = req.body;
    const comment = await commentService.createComment(articleId, author, email, content);
    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
}

export async function approveComment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const comment = await commentService.approveComment(req.params.id);
    if (!comment) {
      res.status(404).json({ success: false, error: 'Comment not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await commentService.deleteComment(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Comment not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
}
