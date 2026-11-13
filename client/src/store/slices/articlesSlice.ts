import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles, fetchFeaturedArticle, fetchPopularArticles } from '../../services/articleService';
import type { Article } from '../../types';

interface ArticlesState {
  items: Article[];
  featured: Article | null;
  popular: Article[];
  total: number;
  page: number;
  pages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ArticlesState = {
  items: [],
  featured: null,
  popular: [],
  total: 0,
  page: 1,
  pages: 0,
  status: 'idle',
  error: null,
};

export const loadArticles = createAsyncThunk(
  'articles/fetchAll',
  async (params: { search?: string; category?: string; page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await fetchArticles(params);
      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch articles');
      }
      return response.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch articles';
      return rejectWithValue(message);
    }
  },
);

export const loadFeaturedArticle = createAsyncThunk(
  'articles/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFeaturedArticle();
      if (!response.success) return rejectWithValue(response.error || 'Failed');
      return response.data ?? null;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed';
      return rejectWithValue(message);
    }
  },
);

export const loadPopularArticles = createAsyncThunk(
  'articles/fetchPopular',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPopularArticles();
      if (!response.success) return rejectWithValue(response.error || 'Failed');
      return response.data ?? [];
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed';
      return rejectWithValue(message);
    }
  },
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    resetArticles(state) {
      state.items = [];
      state.total = 0;
      state.page = 1;
      state.pages = 0;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArticles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.articles;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(loadArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(loadFeaturedArticle.fulfilled, (state, action) => {
        state.featured = action.payload;
      })
      .addCase(loadPopularArticles.fulfilled, (state, action) => {
        state.popular = action.payload;
      });
  },
});

export const { resetArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
