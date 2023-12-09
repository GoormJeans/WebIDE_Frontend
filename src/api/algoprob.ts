import { createSlice } from "@reduxjs/toolkit";


export const levels: string[] = ['Lv.1', 'Lv.2', 'Lv.3'];

//임시로 설정한 타입, API 명세 나오면 변경 가능
export interface Problem {
  id: number;
  level: string;
  title: string;
  solved: boolean;
}

//임시 문제 목록
const initialState: Problem[] = [
  {
    id: 1,
    level: 'Lv.1',
    title: '문제1번',
    solved: false,
  },
  {
    id: 2,
    level: 'Lv.2',
    title: '문제2번',
    solved: true,
  },
  {
    id: 3,
    level: 'Lv.3',
    title: '문제3번',
    solved: false,
  }
]

export const problems = createSlice({
  name: 'problem',
  initialState,
  reducers: {
    // 문제 추가 등 액션 추가
    // addProblems: (state, prob) =>{
      
    // }
  }
})

export default problems.reducer;