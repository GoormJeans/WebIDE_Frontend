import { configureStore } from '@reduxjs/toolkit';
import scripts from './scripts';
import problems from "./algoprob";

export const store = configureStore({
  reducer: {
    scripts: scripts,
    problems: problems,//문제 목록 관리용
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
