import React from 'react'
import { useSelector } from "react-redux"
import { RootState } from "../../api/store"
import { useParams } from "react-router"

const Description = () => {
  const param = useParams();

  //일단 로컬에서는 이렇게 하고 문제 페이지 접속하는 순간 axios로 문제 정보 요청 예정
  const prob = useSelector((state: RootState)=>state.problems).filter(x=>x.id === parseInt(param.id!))[0];
  console.log(prob);

  return (
    <div className="p-3">
      <h1 className="text-3xl">문제 제목: {prob.name}</h1>

    </div>
  )
}

export default Description