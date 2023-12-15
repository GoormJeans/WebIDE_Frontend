import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';



export const langs: any = {
  java: {
    path: '.java',
    defaultLanguage: 'java',
    defaultValue: 'i love java',
  },
  py: {
    path: '.py',
    defaultLanguage: 'python',
    defaultValue: 'i love pyhton',
  },
  cpp: {
    path: '.cpp',
    defaultLanguage: 'cpp',
    defaultValue: 'i love cpp',
  }
};
export const lang: any = ['java', 'py', 'cpp'];


export interface scripts {
  theme: string;
  another: string;
  path: string;
  defaultLanguage: string;
  defaultValue: string;
}

const initialState: scripts = {
  theme: 'vs-dark',
  another: 'vs-light',
  path: 'java-dark',
  defaultLanguage: 'java',
  defaultValue: 'i love java',
};

export const scriptsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setScript: (state) => {
      state.theme = 'vs-dark';
      state.another = 'vs-light';
      state.path = 'py-dark';
      state.defaultLanguage = 'python';
      state.defaultValue = 'i love python';
    },
    setlang: (state, action: PayloadAction<string>) => {
      state.path = langs[action.payload].path;
      state.defaultLanguage = langs[action.payload].defaultLanguage;
      state.defaultValue = langs[action.payload].defaultValue;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      const ano = state.theme;
      state.theme = state.another;
      state.another = ano;
    },
  },
});

export const { setScript, setlang, setTheme } = scriptsSlice.actions;

export default scriptsSlice.reducer;
