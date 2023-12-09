import React from 'react'
import { useNavigate } from "react-router-dom"

const LastAlgo = () => {

  const navigate = useNavigate();
  return (
    <div className="w-full h-72 ">
      <div className="w-auto h-full flex flex-col items-center bg-indigo-500 mx-5 rounded-xl pt-12 px-10 pb-4">
        <div className="bg-white w-full h-40 p-5 rounded-xl">
          <div className="bg-transparent">
            마지막으로 푼 문제
          </div>
          {/* 임시로 넣은 값, 문제 불러오면 ID, 문제 제목 불러오는 기능 추가 예정 */}
          <div className="bg-transparent text-4xl ml-10 mt-7">문제번호: 무슨무슨문제</div>
        </div>
        {/* 클릭 시 editor 페이지로 이동 */}
        <button className="bg-white mt-5 py-2 px-5 rounded-xl" onClick={() => navigate('/editor')}>이어하기</button>
      </div>
    </div>
  )
}

export default LastAlgo