import apiClient from './apiClient';
import type { ApiResponse, Comment } from '@/types';

export async function fetchComments(articleId: string): Promise<ApiResponse<Comment[]>> {
  const { data } = await apiClient.get<ApiResponse<Comment[]>>(`/comments/article/${articleId}`);
  return data;
}

export async function fetchAllComments(): Promise<ApiResponse<Comment[]>> {
  const { data } = await apiClient.get<ApiResponse<Comment[]>>('/comments');
  return data;
}

export async function createComment(articleId: string, author: string, email: string, content: string): Promise<ApiResponse<Comment>> {
  const { data } = await apiClient.post<ApiResponse<Comment>>('/comments', { articleId, author, email, content });
  return data;
}

export async function approveComment(id: string): Promise<ApiResponse<Comment>> {
  const { data } = await apiClient.patch<ApiResponse<Comment>>(`/comments/${id}/approve`);
  return data;
}

export async function deleteCommentApi(id: string): Promise<ApiResponse<void>> {
  const { data } = await apiClient.delete<ApiResponse<void>>(`/comments/${id}`);
  return data;
}
