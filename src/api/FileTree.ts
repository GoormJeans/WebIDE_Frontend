import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import requests from "./EditfetchUrl"
import {instance,instanceJSON, init} from "./axios";
export interface Filetree {
    gData: any,
    autoExpandParent: boolean,
    expandedKeys: [],
    selectedKeys: [],
    filename: "",
    probno : number,
    fetchUrl : string,
    isLoading : boolean,
    error : "",
}

const initialState : Filetree = {
    gData : undefined,
    autoExpandParent: true,
    expandedKeys: [],
    selectedKeys: [],
    filename: "",
    probno : 1,
    fetchUrl : requests.fetchFiletree,
    error : "",
    isLoading : false,
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
    },
    extraReducers : (builder) =>{
        builder
            .addCase(getFiletree.pending, (state) =>{
                state.isLoading = true;
            })
            .addCase(getFiletree.fulfilled, (state, action)=>{
                state.isLoading = false;
                console.log(action.payload.data.data);
                state.gData = action.payload.data.data;
            })
            .addCase(getFiletree.rejected, (state, action: any) => {
                state.isLoading = false;
                state.gData = action.payload;
            })
            .addCase(dragNdrop.pending, (state) =>{
                state.isLoading = true;
            })
            .addCase(dragNdrop.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.gData = action.payload.data.data;
            })
            .addCase(dragNdrop.rejected, (state, action: any) => {
                state.isLoading = false;
                state.gData = action.payload;
            })
            .addCase(Create.pending, (state) =>{
                state.isLoading = true;
            })
            .addCase(Create.fulfilled, (state, action)=>{
                state.isLoading = false;
                console.log(action.payload);
                state.gData = action.payload.data.data;
            })
            .addCase(Create.rejected, (state, action: any) => {
                state.isLoading = false;
                state.gData = action.payload;
            })
    }
});

export const getSelect = async (key : string, number : number) =>{
    try{
        const data = {
            deletePathSuffix : key,
            algorithmId : number
        }
        const accessToken = localStorage.getItem('AccessToken');
        console.log(accessToken);
        const resp = await instance.post(requests.sourcecode,JSON.stringify(data),{headers: {
            'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
            
            
          },} );
        return resp;
    }catch(e)
    {
        return undefined;
    }
}

export const Delete = async (key : string, number : number) =>{
    try{
        const data = {
            deletePathSuffix : key,
            algorithmId : number
        }
        const accessToken = localStorage.getItem('AccessToken');
        console.log(accessToken);
        const resp = await instance.post(requests.delete,JSON.stringify(data),{headers: {
            'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
            accept: 'application/json',"Content-Type": `application/json`,
            
          },} );
        return resp;
    }catch(e)
    {
        return undefined;
    }
}



export const Create = createAsyncThunk(
    "post/Create", async (data :any ) =>{
        try{
            init();
            const resp = await instanceJSON.patch(requests.create,JSON.stringify(data));
            return resp;
        }catch(e)
        {
            return undefined;
        }
    }
)


export const dragNdrop = createAsyncThunk(
    "post/dragNdrop", async (data :any ) =>{
        try{
            init();
            const resp = await instanceJSON.patch(requests.modify,JSON.stringify(data));
            return resp;
        }catch(e)
        {
            return undefined;
        }
    }
)
export const getFiletree = createAsyncThunk(
    "get/Filetree", async (number : number) =>{
        try{
            init();
            const resp = await instance.get(requests.fetchFiletree + number);
            return resp;
        }catch(e)
        {
            console.log("error");
            return undefined;
        }
    }
)






export const { setData, setExpandedKeys, setSelectedKeys, setFilename, setProbno} = FileTree.actions;
export default FileTree.reducer;