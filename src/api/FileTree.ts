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
  fileExtension: string;
  filePath: string;
  error: string;
  sourcode: string;
  result : any;
  java_val: string;
  py_val: string;
  cpp_val: string;
  java_submit: string;
  py_submit: string;
  cpp_submit: string;
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
  fileExtension: "java",
  filePath: "",
  isLoading: false,
  result : "",
  sourcode: '',
  /*`class Solution {
    public int solution(int[] num_list) {
        int answer = 0;
        return answer;
    }
}`*/ java_val: "",
  /*`class Solution {
    public int solution(int[] num_list) {
        int answer = 0;
        return answer;
    }
}`*/ py_val: "",
  /*`def solution(num_list):
    answer = 0
    return answer`*/
  cpp_val: "",
  /*`#include <bits/stdc++.h>
using namespace std;
int solution(vector<int> num_list) {
    int answer = 0;
    return answer;
}`*/ java_submit: "",
  py_submit: "",
  cpp_submit: "",
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
      state.fileExtension = action.payload[0].split(".")[1];
      state.filePath = action.payload[0];
    },
    setProbno: (state, action: PayloadAction<any>) => {
      state.probno = action.payload;
    },
    setValue_c: (state, action: PayloadAction<string>) => {
      state.sourcode = action.payload;
    },
    
    setsave: (state) => {
      if (state.fileExtension === "cpp") state.cpp_val = state.sourcode;
      if (state.fileExtension === "java") state.java_val = state.sourcode;
      if (state.fileExtension === "py") state.py_val = state.sourcode;
    },
    setSubmit: (state) => {
      if (state.fileExtension === "cpp") state.cpp_submit = state.sourcode;
      if (state.fileExtension === "java") state.java_submit = state.sourcode;
      if (state.fileExtension === "py") state.py_submit = state.sourcode;
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
        if (action.payload === undefined) return;
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
        if (action.payload === undefined) return;
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
        if (action.payload === undefined) return;
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
        if (action.payload === undefined) return;
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
        if (action.payload === undefined) 
        {
          state.sourcode = "";
          return;
        }
        state.sourcode = action.payload.data.data[0].sourceCode;
      })
      .addCase(getSelect.rejected, (state, action: any) => {
        state.isLoading = false;
        state.Data = action.payload;
      })
      .addCase(submit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submit.fulfilled, (state, action) => {
        state.isLoading = false;
        if(action.payload === undefined)
          return ;
        state.result = action.payload;
      })
      .addCase(submit.rejected, (state, action: any) => {
        state.isLoading = false;
        state.Data = action.payload;
      });
  },
});
export const execute = createAsyncThunk("post/execute", async (data: any) => {
  try {
    init();
    console.log(data);
    const resp = await instanceJSON.post(
      requests.execute,
      JSON.stringify(data)
    );
    return resp;
  } catch (e) {
    return undefined;
  }
});
export const submit = createAsyncThunk("post/submit", async (data: any) => {
  try {
    init();
    console.log(data);
    const resp = await instanceJSON.post(requests.submit, JSON.stringify(data));
    return resp;
  } catch (e) {
    console.log(e);
    return undefined;
  }
});

export const getSelect = createAsyncThunk("post/select", async (data: any) => {
  try {
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
  setValue_c,
  setsave,
  setSubmit,
} = FileTree.actions;
export default FileTree.reducer;
