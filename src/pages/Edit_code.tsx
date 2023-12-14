import { useRef } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../api/store';
import { setlang_c } from '../api/scripts_c';
import { lang } from '../api/scripts';
import MainCM from '../components/EditorPage/Main_c';
import { useNavigate } from 'react-router-dom';
import File_tree from '../components/EditorPage/File_tree';

const Edit_code = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const setting: any = useSelector((state: RootState) => state.scripts_c);
    const filenameRef: any = useRef(null);
    const handlelangs = (e: any) => {
        console.log(e.target.value);
        dispatch(setlang_c(e.target.value));
    }
    const handleSumit = () => {
        if (setting.now_lang === "cpp")
            alert(setting.cpp_val);
        if (setting.now_lang === "java")
            alert(setting.java_val);
        if (setting.now_lang === "py")
            alert(setting.py_val);
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
        //const fullFilename = `${customFilename}.${langs[selectedLanguage].path.substring(1)}`;
        //alert(fullFilename);
        //saveAsFile(editorRef.current.getValue(), fullFilename);
    };

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
                    <div className='bg-black ml-1 mr-1'></div>
                    <button className="pl-3 pr-3 bg-blue-400  hover:bg-blue-700 text-white font-bold mt-1 mb-1 rounded shadow-md hover:shadow-lg transition duration-150 ease-in-out" onClick={() => handleSumit()}>submit</button>
                </div>
            </div>
            <div className='flex w-full h-100vh bg-white'>
                <div className="w-2/12 font-mono bg-editor-color p-4">
                    <File_tree />

                </div>
                <MainCM />
                <div className='w-4/12 bg-editor-color'>

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

export default Edit_code;