import { useLocation, useNavigate, } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../api/store";
import { setProbno } from "../../api/FileTree";
import { AdminAlgo } from "../../pages/AdminAlgoPage";

//알고리즘 리스트 항목
const AlgoProbs: React.FC<{ prob: AdminAlgo }> = ({ prob }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const url = useLocation();

  return (
    <div className="w-full bg-[#c4c4c4] h-[60px] flex flex-row items-center justify-between p-6 mb-5 rounded-xl shadow-xl whitespace-nowrap hover:cursor-pointer hover:bg-white"
      onClick={() => { dispatch(setProbno(prob.algorithmId)); navigate(url.pathname === '/main' || url.pathname === '/algorithms' ? `/editor/${prob.algorithmId}` : `${prob.algorithmId}`) }} >
      <div className=" flex flex-row">
        {prob.algorithmId}
        <p className=" ml-3">{prob.algorithmName}</p>
      </div>
      <p className="">{prob.level}</p>
    </div>
  )
}

export default AlgoProbs