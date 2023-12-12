import {useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../api/store';
import CodeMirror from '@uiw/react-codemirror';
import { setlang_c} from '../api/scripts_c';
import { lang } from '../api/scripts';
const Main_c = () => {
  const dispatch = useDispatch<AppDispatch>();
  const setting: any = useSelector((state: RootState) => state.scripts_c);
  // const handleChange = () => {
  //   dispatch(setTheme(true));
  //   console.log(setting.theme);
  // };
  const editorRef : any = useRef(null);
  const handlelangs = (e : any) =>{
    console.log(e.target.value);
    dispatch(setlang_c(e.target.value));
  }
  const handleSumit = ()=>{
    if(editorRef.current == null)
      return ;
    alert(editorRef.current.getValue());
  }

  return (
    <div>
      <div>
        <select onChange={(e)=>{handlelangs(e)}}>
          {lang.map((element: any) => {
            return <option value={element}>{element}</option>
          })}
        </select>
        <button onClick={() => alert("없음")}>change_theme</button>
        <button onClick={()=> handleSumit()}>submit</button>
      </div>
      <CodeMirror height='100vh' width='100%' 
      extensions={[setting.ex_lang, setting.ex_autocompletion]}
       theme={setting.theme} value={setting.value}
       basicSetup={{
        foldGutter: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
      }} />
    </div>
  );
};
export default Main_c;
