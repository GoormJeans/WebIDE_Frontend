import { configureStore } from '@reduxjs/toolkit';
import scripts from './scripts';
import algoprobs from "./algoprob";
import filter from "./filter";
import scriptsC from './scripts_c';
import userSlice from './user';
import algoprobsmypage from './algoprobmypage';

export const store = configureStore({
  reducer: {
    scripts: scripts,
    problems: algoprobs,//문제 목록 관리용
    filter: filter,//레벨 필터 설정용
    scriptsC: scriptsC,
    user: userSlice,
    problemsMypage: algoprobsmypage,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
