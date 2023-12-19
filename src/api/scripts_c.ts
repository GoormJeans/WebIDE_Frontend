import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';






export const langs_c: any = {
    java: {
        now_lang: "java",
    },
    py: {
        now_lang: "py",
    },
    cpp: {
        now_lang: "cpp",
    }
};



export interface scriptsC {
    now_lang: string,
    value: string,
    java_val: string,
    py_val: string,
    cpp_val: string,
    java_submit: string,
    py_submit: string,
    cpp_submit: string,
}

const initialState: scriptsC = {
    now_lang: "java",
    value:
        `class Solution {
    public int solution(int[] num_list) {
        int answer = 0;
        return answer;
    }
}`,
    java_val:
        `class Solution {
    public int solution(int[] num_list) {
        int answer = 0;
        return answer;
    }
}`,
    py_val:
        `def solution(num_list):
    answer = 0
    return answer`,
    cpp_val:
        `#include <bits/stdc++.h>
using namespace std;
int solution(vector<int> num_list) {
    int answer = 0;
    return answer;
}`,
    java_submit: "",
    py_submit: "",
    cpp_submit: "",
};

export const scriptsCSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setValue_c: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
        ,
        setlang_c: (state, action: PayloadAction<string>) => {
            if (state.now_lang === "cpp")
                state.cpp_val = state.value;
            if (state.now_lang === "java")
                state.java_val = state.value;
            if (state.now_lang === "py")
                state.py_val = state.value;

            if (langs_c[action.payload].now_lang === "cpp")
                state.value = state.cpp_val;
            if (langs_c[action.payload].now_lang === "java")
                state.value = state.java_val;
            if (langs_c[action.payload].now_lang === "py")
                state.value = state.py_val;
            state.now_lang = langs_c[action.payload].now_lang;
        },
        setsave: (state) => {
            if (state.now_lang === "cpp")
                state.cpp_val = state.value;
            if (state.now_lang === "java")
                state.java_val = state.value;
            if (state.now_lang === "py")
                state.py_val = state.value;
        },
        setSubmit: (state) => {
            if (state.now_lang === "cpp")
                state.cpp_submit = state.value;
            if (state.now_lang === "java")
                state.java_submit = state.value;
            if (state.now_lang === "py")
                state.py_submit = state.value;
        }
    },
});

export const { setValue_c, setlang_c, setsave, setSubmit } = scriptsCSlice.actions;



export default scriptsCSlice.reducer;
