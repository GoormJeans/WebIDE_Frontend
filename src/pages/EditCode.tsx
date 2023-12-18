// import { useRef } from 'react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../api/store';
import { setlang_c, setSubmit } from '../api/scripts_c';
import { lang } from '../api/scripts';
import MainCM from '../components/EditorPage/MainCM';
import { useNavigate } from 'react-router-dom';
import Filetree from '../components/EditorPage/FileTree';
import MessagePanel from "../components/ChattingPage/MessagePanel";
import Description from "../components/EditorPage/Description";
const EditCode = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const setting: any = useSelector((state: RootState) => state.scriptsC);
    //const filenameRef: any = useRef(null);
    const handlelangs = (e: any) => {
        dispatch(setlang_c(e.target.value));
    }
    const AlertSameCode = () => {
        alert("이미 동일한 코드로 제출한 적이 있습니다");
    }
    const handleSumit = () => {

        if (setting.now_lang === "cpp" && setting.cpp_submit === setting.cpp_val) {
            AlertSameCode();
            return;
        }
        if (setting.now_lang === "java" && setting.java_submit === setting.java_val) {
            AlertSameCode();
            return;
        }
        if (setting.now_lang === "py" && setting.py_submit === setting.py_val) {
            AlertSameCode();
            return;
        }
        dispatch(setSubmit());
        if (setting.now_lang === "cpp")
            alert(setting.cpp_val);
        if (setting.now_lang === "java")
            alert(setting.java_val);
        if (setting.now_lang === "py")
            alert(setting.py_val);
    }
    /*
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
            //const fullFilename = `${customFilename}.${langs[selectedLanguage].path.substring(1)}`;
            //alert(fullFilename);
            //saveAsFile(editorRef.current.getValue(), fullFilename);
        };
    */


    //채팅 페이지 보이게하기용
    const [visible, setVisible] = useState(true);


    return (
        <>
            <div className='flex flex-row bg-black'>
                <div className="text-white w-1/12 text-1xl mt-1 mb-1 font-k2d pl-1 hover:cursor-pointer bg-transparent" onClick={() => navigate('/')}>
                    JeansCode
                </div>
                <div className='flex justify-end w-full'>
                    <select className="form-select w-1/12 mt-1 mb-1  bg-white-400 text-black rounded border border-purple-900" onChange={(e) => { handlelangs(e) }}>
                        {lang.map((element: any) => {
                            return <option value={element}>{element}</option>
                        })}
                    </select>
                    {/* 채팅 페이지 버튼 */}
                    <div className="pl-3 pr-3 bg-blue-400  hover:bg-blue-700 text-white font-bold my-1 ml-2 rounded shadow-md hover:shadow-lg transition duration-150 ease-in-out">
                        <button onClick={() => {
                            setVisible(!visible)
                        }}>
                            Chat
                        </button>

                    </div>
                    <div className='bg-black ml-1 mr-1'></div>
                    <button className="pl-3 pr-3 bg-blue-400  hover:bg-blue-700 text-white font-bold mt-1 mb-1 rounded shadow-md hover:shadow-lg transition duration-150 ease-in-out" onClick={() => handleSumit()}>submit</button>
                </div>
            </div>
            <div className='flex w-full h-100vh bg-white'>
                <div className="w-2/12 font-mono bg-editor-color p-4">
                    <Filetree />

                </div>
                <MainCM />
                <Description />
                <div className={`w-fit h-screen bg-editor-color fixed transition-all duration-500 top-[29px] ${visible ? 'right-[-700px]' : 'right-0'}`}>
                    {/* 채팅 페이지 보이게하기 */}
                    <MessagePanel />
                </div>

            </div>
        </>
    );
};
// <button onClick={() => alert("없음")}>change_theme</button>
/*
            <input type='text' placeholder='solution' ref={filenameRef} /> {setting.path}
            <button onClick={() => handleExtract()}>file save</button>
            */

export default EditCode;