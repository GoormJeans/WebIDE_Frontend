import { configureStore } from '@reduxjs/toolkit';
import scripts from './scripts';
import scriptsC from './scripts_c';
import userSlice from './user';
import algoprobs from './algoprobs';

export const store = configureStore({
  reducer: {
    scripts: scripts,
    scriptsC: scriptsC,
    user: userSlice,
    problems: algoprobs,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
