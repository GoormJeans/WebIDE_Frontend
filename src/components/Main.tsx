import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../api/store';
import { Editor } from '@monaco-editor/react';
import { setlang, setTheme, lang } from '../api/scripts';
const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const setting: any = useSelector((state: RootState) => state.scripts);
  const handleChange = () => {
    dispatch(setTheme(true));
    console.log(setting.theme);
  };
  const editorRef: any = useRef(null);
  const handlelangs = (e: any) => {
    console.log(e.target.value);
    dispatch(setlang(e.target.value));
  }
  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }
  const handleSumit = () => {
    if (editorRef.current == null)
      return;
    alert(editorRef.current.getValue());
  }

  return (
    <div>
      <div>
        <select onChange={(e) => { handlelangs(e) }}>
          {lang.map((element: any) => {
            return <option value={element}>{element}</option>
          })}
        </select>
        <button onClick={() => handleChange()}>change_theme</button>
        <button onClick={() => handleSumit()}>submit</button>
      </div>
      <Editor height='100vh' width='100%' onMount={handleEditorDidMount}
        theme={setting.theme} defaultLanguage={setting.defaultLanguage} path={setting.path} defaultValue={setting.defaultValue} />
    </div>
  );
};
export default Main;
