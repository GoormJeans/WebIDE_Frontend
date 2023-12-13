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
        ex_lang: java(),
        ex_autocompletion: autocompletion({ override: [(context) => languageSpecificCompletions("java", context)] }),
        value:
            `class Solution {
            public int solution(int[] num_list) {
                int answer = 0;
                return answer;
            }
        }`,
        theme: myTheme,
    },
    py: {
        ex_lang: python(),
        ex_autocompletion: autocompletion({ override: [(context) => languageSpecificCompletions("python", context)] }),
        value:
            `def solution(num_list):
        answer = 0
        return answer`,
        theme: myTheme,
    },
    cpp: {
        ex_lang: cpp(),
        ex_autocompletion: autocompletion({ override: [(context) => languageSpecificCompletions("cpp", context)] }),
        value:
            `#include <bits/stdc++.h>
        using namespace std;
          
        int solution(vector<int> num_list) {
            int answer = 0;
            return answer;
        }`,
        theme: myTheme,
    }
};



export interface scripts_c {
    ex_lang: any,
    ex_autocompletion: any,
    value: string,
    theme: any,
}

const initialState: scripts_c = {
    ex_lang: java(),
    ex_autocompletion: autocompletion({ override: [(context) => languageSpecificCompletions("java", context)] }),
    value:
        `class Solution {
    public int solution(int[] num_list) {
        int answer = 0;
        return answer;
    }
}`,
    theme: myTheme,
};

export const scripts_c = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setScript_c: (state) => {
            state.theme = myTheme;
            state.ex_autocompletion = autocompletion({ override: [(context) => languageSpecificCompletions("cpp", context)] });
            state.value = `#include <bits/stdc++.h>
            using namespace std;
            int solution(vector<int> num_list) {
                int answer = 0;
                return answer;
            }`;
            state.ex_lang = cpp();
        },
        setlang_c: (state, action: PayloadAction<string>) => {
            state.theme = langs_c[action.payload].theme;
            state.value = langs_c[action.payload].value;
            state.ex_lang = langs_c[action.payload].ex_lang;
            state.ex_autocompletion = langs_c[action.payload].ex_autocompletion;
        },
    },
});

export const { setScript_c, setlang_c } = scripts_c.actions;


export default scripts_c.reducer;
