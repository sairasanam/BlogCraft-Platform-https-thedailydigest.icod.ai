import apiClient from './apiClient';
import type { ApiResponse, Article, ArticleListResponse } from '@/types';

interface FetchArticlesParams {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function fetchArticles(params: FetchArticlesParams = {}): Promise<ApiResponse<ArticleListResponse>> {
  const { data } = await apiClient.get<ApiResponse<ArticleListResponse>>('/articles', { params });
  return data;
}

export async function fetchArticleBySlug(slug: string): Promise<ApiResponse<Article>> {
  const { data } = await apiClient.get<ApiResponse<Article>>(`/articles/${slug}`);
  return data;
}

export async function fetchArticleById(id: string): Promise<ApiResponse<Article>> {
  const { data } = await apiClient.get<ApiResponse<Article>>(`/articles/admin/${id}`);
  return data;
}

export async function fetchPopularArticles(): Promise<ApiResponse<Article[]>> {
  const { data } = await apiClient.get<ApiResponse<Article[]>>('/articles/popular');
  return data;
}

export async function fetchFeaturedArticle(): Promise<ApiResponse<Article>> {
  const { data } = await apiClient.get<ApiResponse<Article>>('/articles/featured');
  return data;
}

export async function fetchRelatedArticles(categoryId: string, excludeId: string): Promise<ApiResponse<Article[]>> {
  const { data } = await apiClient.get<ApiResponse<Article[]>>(`/articles/related/${categoryId}/${excludeId}`);
  return data;
}

export async function createArticle(formData: FormData): Promise<ApiResponse<Article>> {
  const { data } = await apiClient.post<ApiResponse<Article>>('/articles', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateArticle(id: string, formData: FormData): Promise<ApiResponse<Article>> {
  const { data } = await apiClient.put<ApiResponse<Article>>(`/articles/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteArticle(id: string): Promise<ApiResponse<void>> {
  const { data } = await apiClient.delete<ApiResponse<void>>(`/articles/${id}`);
  return data;
}

export async function fetchStats(): Promise<ApiResponse<{ totalViews: number }>> {
  const { data } = await apiClient.get<ApiResponse<{ totalViews: number }>>('/articles/admin/stats');
  return data;
}
