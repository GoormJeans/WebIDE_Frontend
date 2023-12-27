import { configureStore } from '@reduxjs/toolkit';
import scripts from './scripts';
import userSlice from './user';
import authSlice from './auth';
import algoprobs from './algoprobs';
import FileTree from './FileTree';

export const store = configureStore({
  reducer: {
    scripts: scripts,
    user: userSlice,
    auth: authSlice,
    problems: algoprobs,
    FileTree : FileTree,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
