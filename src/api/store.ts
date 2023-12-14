import { configureStore } from '@reduxjs/toolkit';
import scripts from './scripts';
import algoprobs from "./algoprob";
import filter from "./filter";
import scripts_c from './scripts_c';
export const store = configureStore({
  reducer: {
    scripts: scripts,
    problems: algoprobs,//문제 목록 관리용
    filter: filter,//레벨 필터 설정용
    scripts_c: scripts_c,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
