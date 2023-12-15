import { createSlice } from "@reduxjs/toolkit";
import { Algorithm } from "../types/Algorithm.type";

//임시 문제 목록, solved는 일단 제외
const initialState: Algorithm[] = [
  {
    id: 1,
    name: '문제1번',
    url: 'algo1',
    tag: 'dummy',
    level: 1
  },
  {
    id: 2,
    name: '문제2번',
    url: 'algo2',
    tag: 'dummmmy',
    level: 2
  },
  {
    id: 3,
    name: '문제3번',
    url: 'algo3',
    tag: 'tummy',
    level: 3
  },
  {
    id: 4,
    name: '문제4번',
    url: 'algo4',
    tag: 'dummy',
    level: 3,
  },
  {
    id: 5,
    name: '문제5번',
    url: 'algo5',
    tag:'gummy',
    level: 2
  },
  {
    id: 6,
    name: '문제6번',
    url: 'algo6',
    tag: 'six',
    level: 2
  }
]

export const solved: number[] = [1, 3, 4, 6];

export const algoprobs = createSlice({
  name: 'algorithm',
  initialState,
  reducers: {
    // 문제 추가 등 액션 추가
    // addProblems: (state, prob) =>{

    // }
  }
})

export default algoprobs.reducer;