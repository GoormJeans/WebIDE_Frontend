import { useLocation, useNavigate, } from "react-router-dom";
import { Algorithm } from "../../types/Algorithm.type";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../api/store";
import {setProbno} from "../../api/FileTree";

//알고리즘 리스트 항목
const AlgoProbs: React.FC<{ prob: Algorithm }> = ({ prob }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const url = useLocation();

  return (
    <div className="w-full bg-[#c4c4c4] h-[60px] flex flex-row items-center justify-between p-6 mb-5 rounded-xl shadow-xl whitespace-nowrap hover:cursor-pointer hover:bg-white"
      onClick={() => {dispatch(setProbno(prob.id));navigate(url.pathname === '/main' || url.pathname === '/algorithms' ? `/editor/${prob.id}` : `${prob.id}`)}}//클릭 시 editor 페이지로 이동, 나중에 id를 이용해서 문제 페이지로 이동시키는 방식으로 하면 될 듯
    >
      <div className=" flex flex-row">
        <p className=" w-4">{prob.solved && "O"}</p>{/* 문제 풀었으면 O로 표시 */}
        <p className=" ml-3">{prob.name}</p>
      </div>
      <p className="">{prob.level}</p>
    </div>
  )
}

export default AlgoProbs