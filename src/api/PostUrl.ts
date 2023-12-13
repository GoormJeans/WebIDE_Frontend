import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./axios";

export interface JSON_File{
    PostUrl : string,
    isLoading : boolean,
    error : string,
}

const initialState : JSON_File = {
    PostUrl : "",
    isLoading : false,
    error : "",
}


export const PostUrl = createSlice({
    name : 'Post_file',
    initialState,
    reducers : {

    },
    extraReducers : (builder : any) =>{
        builder
        .addCase(PostFile.pending, (state : any) => {
            state.isLoading = true;
        })
        .addCase(PostFile.fulfilled, (state : any, action : any) => {
            state.isLoading = false;
        })
        .addCase(PostFile.rejected, (state : any, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
});

const postUrl : string = "";
const data: any = {context : "",};
export const PostFile = createAsyncThunk(
    postUrl, async (thunkAPI : void) => {
        instance.post(postUrl, data)
        .then((result : string) => {
            return result;
        }).catch((err : string) => {
            return err;
        });
    }
)