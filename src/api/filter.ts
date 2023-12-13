import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export const levels: string[] = [ '레벨', 'Lv.1', "Lv.2", 'Lv.3', 'Lv.4' ];

const initialState: { level: string } = { level: levels[0] }

export const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterLevel: (state, action: PayloadAction<string>) => {
      state.level = levels[levels.indexOf(action.payload)]
    }
  }
})

export const { setFilterLevel } = filter.actions;

export default filter.reducer;