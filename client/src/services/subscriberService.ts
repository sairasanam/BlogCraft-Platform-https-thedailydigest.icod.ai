import apiClient from './apiClient';
import type { ApiResponse, Subscriber } from '@/types';

export async function subscribeEmail(email: string): Promise<ApiResponse<Subscriber>> {
  const { data } = await apiClient.post<ApiResponse<Subscriber>>('/subscribers', { email });
  return data;
}

export async function fetchSubscribers(): Promise<ApiResponse<Subscriber[]>> {
  const { data } = await apiClient.get<ApiResponse<Subscriber[]>>('/subscribers');
  return data;
}

export async function deleteSubscriber(id: string): Promise<ApiResponse<void>> {
  const { data } = await apiClient.delete<ApiResponse<void>>(`/subscribers/${id}`);
  return data;
}
