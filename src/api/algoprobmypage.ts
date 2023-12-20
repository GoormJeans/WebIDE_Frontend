import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlgorithmSolved } from "../types/Algorithm.type";

const initialState: AlgorithmSolved[] = [
  
]

export const algoprobsmypage = createSlice({
  name: 'algoprobsmypage',
  initialState,
  reducers: {
    addProblems: (state, action: PayloadAction<AlgorithmSolved[]>) => {
      return action.payload;
    },
  }
})

export const { addProblems } = algoprobsmypage.actions;
export default algoprobsmypage.reducer;