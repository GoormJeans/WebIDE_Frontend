
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../api/store';
import CodeMirror from '@uiw/react-codemirror';
import { setValue_c } from '../api/scripts_c';
const MainCM = () => {
  const dispatch = useDispatch<AppDispatch>();
  const setting: any = useSelector((state: RootState) => state.scripts_c);
  const onchange = (e: any, en: any) => {
    dispatch(setValue_c(e));
  }
  return (
    <div className='w-6/12'>

      <CodeMirror height='100vh' width='100%'
        extensions={[setting.ex_lang, setting.ex_autocompletion]}
        theme={setting.theme} value={setting.value}
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
