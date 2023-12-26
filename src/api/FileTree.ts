import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import requests from "./EditfetchUrl";
import { instance, instanceJSON, init } from "./axios";
import { solution } from "../assets/file_tree/dataUtil";
export interface Filetree {
  Data: any;
  gData: any;
  autoExpandParent: boolean;
  expandedKeys: [];
  selectedKeys: [];
  probno: number;
  fetchUrl: string;
  isLoading: boolean;
  error: "";
}

const initialState: Filetree = {
  Data: undefined,
  gData: undefined,
  autoExpandParent: true,
  expandedKeys: [],
  selectedKeys: [],
  probno: 1,
  fetchUrl: requests.fetchFiletree,
  error: "",
  isLoading: false,
};

export const FileTree = createSlice({
  name: "Filetree",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.gData = action.payload;
    },
    setExpandedKeys: (state, action: PayloadAction<any>) => {
      state.expandedKeys = action.payload;
    },
    setSelectedKeys: (state, action: PayloadAction<any>) => {
      state.selectedKeys = action.payload;
    },
    setProbno: (state, action: PayloadAction<any>) => {
      state.probno = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFiletree.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFiletree.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if(action.payload === undefined)
          return ;
        state.Data = action.payload.data;
        state.gData = solution(state.Data);
      })
      .addCase(getFiletree.rejected, (state, action: any) => {
        state.isLoading = false;
        state.Data = action.payload;
      })
      .addCase(dragNdrop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dragNdrop.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload.data);
        state.Data = action.payload.data;
        state.gData = solution(state.Data);
      })
      .addCase(dragNdrop.rejected, (state, action: any) => {
        state.isLoading = false;
        state.Data = action.payload;
      })
      .addCase(Create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Create.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.Data = action.payload.data;
        state.gData = solution(state.Data);
      })
      .addCase(Create.rejected, (state, action: any) => {
        state.isLoading = false;
        state.Data = action.payload;
      })
      .addCase(Delete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Delete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Data = action.payload.data;
        state.gData = solution(state.Data);
      })
      .addCase(Delete.rejected, (state, action: any) => {
        state.isLoading = false;
        state.Data = action.payload;
      })
      .addCase(getSelect.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSelect.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Data = action.payload.data;
        state.gData = solution(state.Data);
      })
      .addCase(getSelect.rejected, (state, action: any) => {
        state.isLoading = false;
        state.Data = action.payload;
      })
  },
});

export const getSelect = createAsyncThunk("post/select", async (data: any) => {
  try {
    /* const data = {
            deletePathSuffix: key,
            algorithmId: number,
          };*/
    init();
    console.log(data);
    const resp = await instanceJSON.post(
      requests.sourcecode,
      JSON.stringify(data)
    );
    return resp;
  } catch (e) {
    return undefined;
  }
});

export const Delete = createAsyncThunk("post/Delete", async (data: any) => {
  try {
    init();
    console.log(data);
    const resp = await instanceJSON.post(requests.delete, JSON.stringify(data));
    return resp;
  } catch (e) {
    return undefined;
  }
});

export const Create = createAsyncThunk("post/Create", async (data: any) => {
  try {
    init();
    console.log(data);
    const resp = await instanceJSON.post(requests.create, JSON.stringify(data));

    return resp;
  } catch (e) {
    console.log(e);
    return undefined;
  }
});

export const dragNdrop = createAsyncThunk(
  "post/dragNdrop",
  async (data: any) => {
    try {
      init();
      const resp = await instanceJSON.patch(
        requests.modify,
        JSON.stringify(data)
      );
      return resp;
    } catch (e) {
      return undefined;
    }
  }
);
export const getFiletree = createAsyncThunk(
  "get/Filetree",
  async (number: number) => {
    try {
      init();
      const resp = await instance.get(requests.fetchFiletree + number);
      return resp;
    } catch (e) {
      console.log("error");
      return undefined;
    }
  }
);

export const {
  setData,
  setExpandedKeys,
  setSelectedKeys,
  setProbno,
} = FileTree.actions;
export default FileTree.reducer;
