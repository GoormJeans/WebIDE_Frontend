import { useNavigate } from "react-router-dom";
import { AlgorithmSolved } from "../../types/Algorithm.type";
import React from "react";

//알고리즘 리스트 항목
const AlgoProbs: React.FC<{prob: AlgorithmSolved; }> = ({ prob }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#c4c4c4] h-[60px] flex flex-row items-center justify-between p-6 mb-5 rounded-xl shadow-xl whitespace-nowrap hover:cursor-pointer hover:bg-white"
      onClick={() => navigate(`${prob.id}`)}//클릭 시 editor 페이지로 이동, 나중에 id를 이용해서 문제 페이지로 이동시키는 방식으로 하면 될 듯
    >
      <div className="bg-transparent flex flex-row">
        <p className="bg-transparent w-4">{prob.solved && "O"}</p>{/* 문제 풀었으면 O로 표시 */}
        <p className="bg-transparent ml-3">{prob.name}</p>
      </div>
      <p className="bg-transparent">{prob.level}</p>
    </div>
  )
}

export default AlgoProbs