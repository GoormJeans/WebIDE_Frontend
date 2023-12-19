
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../api/store';
import CodeMirror from '@uiw/react-codemirror';
import { setValue_c, setsave } from '../../api/scripts_c';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { CompletionContext, autocompletion } from '@codemirror/autocomplete';
import { createTheme } from '@uiw/codemirror-themes';

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
      case "py":
          return pythonCompletions;
      case "java":
          return javaCompletions;
      case "cpp":
          return cppCompletions;
      default:
          return [];
  }
}


function languagesel(language: string) {
  switch (language) {
      case "python":
          return python();
      case "java":
          return java();
      case "cpp":
          return cpp();
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



const MainCM = () => {
  const dispatch = useDispatch<AppDispatch>();
  const setting: any = useSelector((state: RootState) => state.scriptsC);
  const onchange = (e: any, en: any) => {
    dispatch(setValue_c(e));
    dispatch(setsave());
  }
  return (
    <div className='w-6/12'>

      <CodeMirror height='97vh' width='100%'
        extensions={[languagesel(setting.now_lang), autocompletion({ override: [(context) => languageSpecificCompletions(setting.now_lang, context)]})]}
        theme={myTheme} value={setting.value}
        onChange={(e: any, en: any) => onchange(e, en)}
        basicSetup={{
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
        }} />
    </div>
  );
};

export default MainCM;
