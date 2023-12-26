import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface Filetree {
    gData: [],
    autoExpandParent: boolean,
    expandedKeys: [],
    selectedKeys: [],
    filename: "",
    probno : number,
}

const initialState : Filetree = {
    gData: [],
    autoExpandParent: true,
    expandedKeys: [],
    selectedKeys: [],
    filename: "",
    probno : 1,
  };

export const FileTree = createSlice({
    name : "Filetree",
    initialState,
    reducers : {
        setData : (state, action: PayloadAction<any>) => {
            state.gData = action.payload;
        },
        setExpandedKeys : (state, action: PayloadAction<any>) => {
            state.expandedKeys = action.payload;
             
        },
        setSelectedKeys : (state, action: PayloadAction<any>) => {
            state.selectedKeys = action.payload;
        },
        setFilename : (state, action: PayloadAction<any>) => {
            state.filename = action.payload;
        },
        setProbno : (state, action: PayloadAction<any>) => {
            state.probno = action.payload;
        }
    }
});

export const { setData, setExpandedKeys, setSelectedKeys, setFilename, setProbno} = FileTree.actions;
export default FileTree.reducer;