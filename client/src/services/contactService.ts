import apiClient from './apiClient';
import type { ApiResponse, ContactMessage } from '@/types';

export async function submitContactForm(name: string, email: string, subject: string, message: string): Promise<ApiResponse<ContactMessage>> {
  const { data } = await apiClient.post<ApiResponse<ContactMessage>>('/contact', { name, email, subject, message });
  return data;
}

export async function fetchContactMessages(): Promise<ApiResponse<ContactMessage[]>> {
  const { data } = await apiClient.get<ApiResponse<ContactMessage[]>>('/contact');
  return data;
}
