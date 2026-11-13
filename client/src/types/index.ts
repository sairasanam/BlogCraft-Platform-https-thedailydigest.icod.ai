// Standard response envelope returned by the Express backend.
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
  message?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: Category | string;
  publishedAt: string | null;
  status: 'draft' | 'published' | 'scheduled';
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  articleId: Article | string;
  author: string;
  email: string;
  content: string;
  approved: boolean;
  createdAt: string;
}

export interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ArticleListResponse {
  articles: Article[];
  total: number;
  page: number;
  pages: number;
}
