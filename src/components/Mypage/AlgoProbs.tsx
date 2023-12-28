import { useNavigate } from "react-router-dom";
import { Algorithm } from "../../types/Algorithm.type";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../api/store";
import { setProbno } from "../../api/FileTree";

//알고리즘 리스트 항목
const AlgoProbs: React.FC<{prob: Algorithm; }> = ({ prob }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="w-full bg-[#c4c4c4] h-[60px] flex flex-row items-center justify-between p-6 mb-5 rounded-xl shadow-xl whitespace-nowrap hover:cursor-pointer hover:bg-white"
      onClick={() => {dispatch(setProbno(prob.id));navigate(`/editor/${prob.id}`)}}
    >
      <div className=" flex flex-row">
        <p className=" w-4">{prob.solved && '✅'}</p>
        <p className=" ml-3">{prob.name}</p>
      </div>
      <p className="">{prob.tag !== '태그' && (prob.tag + ' - ')}Lv.{prob.level}</p>
    </div>
  )
}

export default AlgoProbs