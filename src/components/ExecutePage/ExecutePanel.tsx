import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../api/store';
import { execute, setTestCase } from '../../api/FileTree';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ExecutePanel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const setting: any = useSelector((state: RootState) => state.FileTree);
    const handleChange = (e : any) =>{
        dispatch(setTestCase(e));
    }
    const handleExecute = async () =>{
        const hardcoding: any = {
            java: "JAVA",
            py: "PYTHON3",
            cpp: "CPP",
          };
        const data = {
            algorithmId : setting.probno,
            sourceCode : setting.sourcode,
            filePath : setting.filePath,
            fileExtension : setting.fileExtension,
            testCase : hardcoding[setting.fileExtension],
        };
        const result = await dispatch(execute(data));
        console.log(result);
    }
  return (
    <div className="p-5 h-fit bg-[#AFAEAE] rounded-xl">
        <textarea id="algo_content" className="bg-white mb-5 mr-5 w-full rounded-xl p-3" value={setting.test_Case} onChange={(e) => handleChange(e.target.value)} />
        
        <div className="hover:bg-blue-400 pl-4 pr-4" onClick={handleExecute}>제출</div>
    </div>
  )
}
//<Markdown remarkPlugins={[remarkGfm]} className="w-full border-2 p-3 overflow-auto prose lg:prose-xl" />
export default ExecutePanel;