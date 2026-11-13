import apiClient from './apiClient';
import type { ApiResponse, Category } from '@/types';

export async function fetchCategories(): Promise<ApiResponse<Category[]>> {
  const { data } = await apiClient.get<ApiResponse<Category[]>>('/categories');
  return data;
}

export async function fetchCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
  const { data } = await apiClient.get<ApiResponse<Category>>(`/categories/${slug}`);
  return data;
}

export async function createCategory(name: string, slug: string, description: string): Promise<ApiResponse<Category>> {
  const { data } = await apiClient.post<ApiResponse<Category>>('/categories', { name, slug, description });
  return data;
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<ApiResponse<Category>> {
  const { data } = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, updates);
  return data;
}

export async function deleteCategory(id: string): Promise<ApiResponse<void>> {
  const { data } = await apiClient.delete<ApiResponse<void>>(`/categories/${id}`);
  return data;
}
