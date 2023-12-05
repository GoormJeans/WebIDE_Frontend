import { configureStore } from '@reduxjs/toolkit';
import scripts from './scripts';

export const store = configureStore({
  reducer: {
    scripts: scripts,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
