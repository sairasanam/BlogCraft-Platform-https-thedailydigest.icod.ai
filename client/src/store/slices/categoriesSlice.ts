import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories } from '../../services/categoryService';
import type { Category } from '../../types';

interface CategoriesState {
  items: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const loadCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCategories();
      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch categories');
      }
      return response.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch categories';
      return rejectWithValue(message);
    }
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;
