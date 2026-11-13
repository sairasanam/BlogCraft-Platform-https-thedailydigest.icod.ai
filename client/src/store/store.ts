import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import articlesReducer from './slices/articlesSlice';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    articles: articlesReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
