import React from 'react'
// import { useSelector } from "react-redux"
// import { RootState } from "../../api/store"
// import { useParams } from "react-router"
import remarkGfm from "remark-gfm"
import Markdown from "react-markdown"

const Description = () => {
  // const param = useParams();

  //일단 로컬에서는 이렇게 하고 문제 페이지 접속하는 순간 axios로 문제 정보 요청 예정
  // const prob = useSelector((state: RootState)=>state.problems).filter(x=>x.id === parseInt(param.id!))[0];

  return (
    <div className="p-3">
      {/* <h1 className="text-3xl">{prob.name}</h1> */}
      <Markdown remarkPlugins={[remarkGfm]} className="w-full p-3 overflow-auto prose lg:prose-xl"></Markdown>
    </div>
  )
}

export default Description