import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../api/store';
import { execute, setTestCase } from '../../api/FileTree';

const ExecutePanel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const setting: any = useSelector((state: RootState) => state.FileTree);
    const handleChange = (e : any) =>{
        dispatch(setTestCase(e.target.vale));
    }
    const handleExecute = () =>{
        const data = {
            algorithmId : setting.probno,
            sourceCode : setting.sourcode,
            filePath : setting.filePath,
            fileExtension : setting.fileExtension,
            testCase : setting.test_Case,
        };
        dispatch(execute(data));
    }
  return (
    <div className="p-5 h-fit bg-[#AFAEAE] rounded-xl">
        <input value={setting.test_Case} onChange={handleChange} className="w-5/6"></input>
        <div className="w-100% hover:bg-stone-400 pl-4 pr-4" onClick={handleExecute}>제출</div>
    </div>
  )
}

export default ExecutePanel;