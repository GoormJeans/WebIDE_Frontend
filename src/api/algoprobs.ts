import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Algorithm } from "../types/Algorithm.type";

const initialState: Algorithm[] = [
  
]

export const algoprobs = createSlice({
  name: 'algoprobs',
  initialState,
  reducers: {
    addProblems: (state, action: PayloadAction<Algorithm[]>) => {
      return action.payload;
    },
  }
})

export const { addProblems } = algoprobs.actions;
export default algoprobs.reducer;