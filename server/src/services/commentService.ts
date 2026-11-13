import Comment, { type IComment } from '../models/Comment';

export async function getComments(articleId: string, approvedOnly = false): Promise<IComment[]> {
  const query: Record<string, unknown> = { articleId };
  if (approvedOnly) query.approved = true;
  return Comment.find(query).sort({ createdAt: -1 });
}

export async function getAllComments(): Promise<IComment[]> {
  return Comment.find().sort({ createdAt: -1 }).populate('articleId', 'title slug');
}

export async function createComment(articleId: string, author: string, email: string, content: string): Promise<IComment> {
  return Comment.create({ articleId, author, email, content, approved: false });
}

export async function approveComment(id: string): Promise<IComment | null> {
  return Comment.findByIdAndUpdate(id, { approved: true }, { new: true });
}

export async function deleteComment(id: string): Promise<boolean> {
  const result = await Comment.findByIdAndDelete(id);
  return !!result;
}
