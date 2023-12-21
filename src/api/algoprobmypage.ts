import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Algorithm } from "../types/Algorithm.type";

const initialState: Algorithm[] = [
  
]

export const algoprobsmypage = createSlice({
  name: 'algoprobsmypage',
  initialState,
  reducers: {
    addProblems: (state, action: PayloadAction<Algorithm[]>) => {
      return action.payload;
    },
  }
})

export const { addProblems } = algoprobsmypage.actions;
export default algoprobsmypage.reducer;