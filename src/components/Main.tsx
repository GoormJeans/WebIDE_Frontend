import {useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../api/store';
import { Editor } from '@monaco-editor/react';
import { setlang,setTheme, lang, langs } from '../api/scripts';
const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const setting: any = useSelector((state: RootState) => state.scripts);
  const filenameRef: any = useRef(null);
  const handleChange = () => {
    dispatch(setTheme(true));
    console.log(setting.theme);
  };
  const editorRef : any = useRef(null);
  const handlelangs = (e : any) =>{
    console.log(e.target.value);
    dispatch(setlang(e.target.value));
  }
  function handleEditorDidMount(editor : any) {
    editorRef.current = editor;
  }
  const handleSumit = ()=>{
    if(editorRef.current == null)
      return ;
    alert(editorRef.current.getValue());
  }

  function saveAsFile(str: string, filename: string) {
    const blob = new Blob([str], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const handleExtract = () => {
    const selectedLanguage = setting.defaultLanguage;
    const customFilename = filenameRef.current.value || 'solution'; // Use input or default filename
    const fullFilename = `${customFilename}.${lang[selectedLanguage].path.substring(1)}`;

    saveAsFile(editorRef.current.getValue(), fullFilename);
  };

  return (
    <div>
      <div>
        <select onChange={(e)=>{handlelangs(e)}}>
          {lang.map((element: any) => {
            return <option value={element}>{element}</option>
          })}
        </select>
        <button onClick={() => handleChange()}>change_theme</button>
        <button onClick={()=> handleSumit()}>submit</button>
        <input type='text' placeholder='solution' ref={filenameRef} /> {setting.path} 
        <button onClick={() => handleExtract()}>file save</button>
      </div>
      <Editor height='100vh' width='100%' onMount={handleEditorDidMount}
       theme={setting.theme} defaultLanguage={setting.defaultLanguage} path={setting.path} defaultValue={setting.defaultValue} />
    </div>
  );
};
export default Main;
