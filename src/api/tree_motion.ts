import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface tree_motion {
    enable: boolean,
}

const initialState: tree_motion = {
    enable: true,
};

export const tree_motion = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMotion: (state, action: PayloadAction<boolean>) => {
            state.enable = !state.enable;
        },
    },
});

export const { setMotion } = tree_motion.actions;

export default tree_motion.reducer;