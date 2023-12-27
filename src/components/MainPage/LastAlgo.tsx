import React from 'react'
import { useNavigate } from "react-router-dom"
import { Algorithm } from "../../types/Algorithm.type";

const LastAlgo: React.FC<{ prob: Algorithm }> = ({ prob }) => {

  const navigate = useNavigate();
  return (
    prob ?
      <div className="w-full h-72 mt-5">
        <div className="w-auto h-full flex flex-col items-center bg-nav-color mx-5 rounded-xl pt-12 px-10 pb-4 shadow-xl">
          <div className="bg-white w-full h-40 p-5 rounded-xl">
            <div>
              아직 안 풀어본 문제
            </div>
            <div>
              Lv.{prob.level}{prob.tag !== '태그' && (' - ' + prob.tag)}
            </div>
            <div className="text-4xl ml-10 mt-5">{prob.name}</div>
          </div>
          <button className="bg-white mt-5 py-2 px-5 rounded-xl" onClick={() => navigate(`/editor/${prob.id}`)}>풀어보기</button>
        </div>
      </div>
      :
      <div className="w-full h-72 mt-5">
        <div className="w-auto h-full flex flex-col items-center bg-nav-color mx-5 rounded-xl pt-12 px-10 pb-4 shadow-xl">
          <div className="bg-white w-full h-40 p-5 rounded-xl flex items-center justify-center text-4xl">
            문제 만들고 있어요.
          </div>
        </div>
      </div>
  )
}

export default LastAlgo