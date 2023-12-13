import { configureStore } from '@reduxjs/toolkit';
import scripts from './scripts';
import scripts_c from './scripts_c';

export const store = configureStore({
  reducer: {
    scripts: scripts,
    scripts_c: scripts_c,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
