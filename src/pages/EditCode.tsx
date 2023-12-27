// import { useRef } from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../api/store";
import MainCM from "../components/EditorPage/MainCM";
import { useNavigate } from "react-router-dom";
import Filetree from "../components/EditorPage/FileTree";
import MessagePanel from "../components/ChattingPage/MessagePanel";
import Description from "../components/EditorPage/Description";
import {
  //execute,
  submit,
  setSubmit,
  setProbno,
} from "../api/FileTree";
import Modal from "../components/Modal";
const EditCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const setting: any = useSelector((state: RootState) => state.FileTree);
  const [isModal, SetisModal] = useState<any>();
  const AlertSameCode = () => {
    alert("이미 동일한 코드로 제출한 적이 있습니다");
  };
  const Submit = async (sourceCode: string) => {
    const hardcoding: any = {
      java: "JAVA",
      py: "PYTHON3",
      cpp: "CPP",
    };
    const Data = {
      algorithmId: setting.probno,
      sourceCode: sourceCode,
      edited: true,
      filePathSuffix : setting.filePath,
      fileExtension: hardcoding[setting.fileExtension],
    };
    await dispatch(submit(Data));
    SetisModal(true);
  };
  useEffect(()=>{
    const probid = localStorage.getItem('id');
    dispatch(setProbno(Number(probid)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[localStorage.getItem('id')]);
  const handleSumit = () => {
    if (
      setting.fileExtension === "cpp" &&
      setting.cpp_submit === setting.cpp_val
    ) {
      AlertSameCode();
      return;
    }
    if (
      setting.fileExtension === "java" &&
      setting.java_submit === setting.java_val
    ) {
      AlertSameCode();
      return;
    }
    if (
      setting.fileExtension === "py" &&
      setting.py_submit === setting.py_val
    ) {
      AlertSameCode();
      return;
    }
    dispatch(setSubmit());
    if (setting.fileExtension === "cpp") Submit(setting.cpp_val);
    if (setting.fileExtension === "java") Submit(setting.java_val);
    if (setting.fileExtension === "py") Submit(setting.py_val);
  };

  //채팅 페이지 보이게하기용
  const [visible, setVisible] = useState(true);


  return (
    <>
      <div className="flex flex-row bg-black">
        <div
          className="text-white w-1/12 text-1xl mt-1 mb-1  pl-1 hover:cursor-pointer "
          onClick={() => navigate("/main")}
        >
          JeansCode
        </div>
        <div className="flex justify-end w-full">
          {/* 채팅 페이지 버튼 */}
          <button
            className="pl-3 pr-3 bg-blue-400  hover:bg-blue-700 text-white font-bold my-1 ml-2 rounded shadow-md hover:shadow-lg transition duration-150 ease-in-out"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            Chat
          </button>
          <div className="bg-black ml-1 mr-1"></div>
          <button
            className="pl-3 pr-3 bg-blue-400  hover:bg-blue-700 text-white font-bold mt-1 mb-1 rounded shadow-md hover:shadow-lg transition duration-150 ease-in-out"
            onClick={() => handleSumit()}
          >
            submit
          </button>
        </div>
      </div>
      <div className="flex w-full h-100vh bg-white">
        <div className="w-2/12 font-mono bg-editor-color p-4">
          <Filetree />
        </div>
        <MainCM />
        <Description />
        <div
          className={` fixed transition-all duration-500 top-8 rounded-xl ${
            visible ? "right-[-700px]" : "right-1"
          }`}
        >
          {/* 채팅 페이지 보이게하기 */}
          <MessagePanel />
        </div>
        <Modal isOpen={isModal === true } handleClose={() => {SetisModal(!isModal) } }>
            <p className="pb-10">제출되었습니다.</p>
        </Modal>
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
