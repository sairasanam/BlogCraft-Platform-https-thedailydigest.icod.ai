import apiClient from './apiClient';
import type { ApiResponse, AuthResponse } from '@/types';

export async function loginRequest(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
  const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', { email, password });
  return data;
}

export async function registerRequest(name: string, email: string, password: string): Promise<ApiResponse<{ id: string; name: string; email: string; role: string }>> {
  const { data } = await apiClient.post('/auth/register', { name, email, password });
  return data;
}
