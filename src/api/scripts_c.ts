import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { createTheme } from '@uiw/codemirror-themes';
import { CompletionContext, autocompletion } from '@codemirror/autocomplete';
import { tags as t } from '@lezer/highlight';

const pythonCompletions = [
    { label: "print", type: "function" },
    { label: "if", type: "keyword" },
    { label: "else", type: "keyword" },
    // Add more Python completions as needed
];

const javaCompletions = [
    { label: "public", type: "keyword" },
    { label: "class", type: "keyword" },
    { label: "void", type: "keyword" },
    // Add more Java completions as needed
];

const cppCompletions = [
    { label: "int", type: "keyword" },
    { label: "double", type: "keyword" },
    { label: "class", type: "keyword" },
    { label: "include", type: "keyword" },
    { label: "vector", type: "keyword" },
    { label: "string", type: "keyword" },
    { label: "iostream", type: "keyword" },
    // Add more C++ completions as needed
];


function languageCompletions(language: string) {
    switch (language) {
        case "python":
            return pythonCompletions;
        case "java":
            return javaCompletions;
        case "cpp":
            return cppCompletions;
        default:
            return [];
    }
}

function languageSpecificCompletions(language: string, context: CompletionContext) {
    let before = context.matchBefore(/\w+/);
    if (!context.explicit && !before) return null;
    return {
        from: before ? before.from : context.pos,
        options: languageCompletions(language),
        validFor: /^\w*$/,
    };
}

const myTheme = createTheme({
    theme: 'dark',
    settings: {
        background: '#1E1E1E',
        foreground: '#D4D4D4',
        caret: '#82AAFF',
        selection: '#3A3D41',
        selectionMatch: '#31424A',
        lineHighlight: '#212121',
        gutterBorder: '1px solid #1E1E1E',
        gutterBackground: '#212121',
        gutterForeground: '#4A5768',
    },
    styles: [
        { tag: t.comment, color: '#546E7A' },
        { tag: t.variableName, color: '#82AAFF' },
        { tag: [t.string, t.special(t.brace)], color: '#C3E88D' },
        { tag: t.number, color: '#F78C6C' },
        { tag: t.bool, color: '#FFCB6B' },
        { tag: t.null, color: '#F07178' },
        { tag: t.keyword, color: '#C792EA' },
        { tag: t.operator, color: '#89DDFF' },
        { tag: t.className, color: '#FF5370' },
        { tag: t.definition(t.typeName), color: '#FF5370' },
        { tag: t.typeName, color: '#FF5370' },
        { tag: t.angleBracket, color: '#89DDFF' },
        { tag: t.tagName, color: '#82AAFF' },
        { tag: t.attributeName, color: '#FFCB6B' },
    ],
});

export const langs_c: any = {
    java: {
        now_lang: "java",
        ex_lang: java(),
        ex_autocompletion: autocompletion({ override: [(context) => languageSpecificCompletions("java", context)] }),
        theme: myTheme,
    },
    py: {
        now_lang: "py",
        ex_lang: python(),
        ex_autocompletion: autocompletion({ override: [(context) => languageSpecificCompletions("python", context)] }),
        theme: myTheme,
    },
    cpp: {
        now_lang: "cpp",
        ex_lang: cpp(),
        ex_autocompletion: autocompletion({ override: [(context) => languageSpecificCompletions("cpp", context)] }),
        value:
            `#include <bits/stdc++.h>
        using namespace std;
        
        int solution(vector<int> num_list) {
            int answer = 0;
            return answer;
        }`,
    }
};



export interface scriptsC {
    now_lang: string,
    ex_lang: any,
    ex_autocompletion: any,
    value: string,
    java_val: string,
    py_val: string,
    cpp_val: string,
    java_submit: string,
    py_submit: string,
    cpp_submit: string,
    theme: any,
}

let initialState: scriptsC = {
    now_lang: "java",
    ex_lang: java(),
    ex_autocompletion: autocompletion({ override: [(context) => languageSpecificCompletions("java", context)] }),
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
    theme: myTheme,
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
            state.ex_lang = langs_c[action.payload].ex_lang;
            state.now_lang = langs_c[action.payload].now_lang;
            state.ex_autocompletion = langs_c[action.payload].ex_autocompletion;
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
