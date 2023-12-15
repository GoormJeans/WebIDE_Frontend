import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "../api/store";

const AddAlgoPage = () => {

  const param = useParams();

  // DB에서 param의 id를 가진 문제 검색으로 변경 예정
  const probs = useSelector((state: RootState) => state.problems);

  const [name, setName] = useState("");
  const [level, setLevel] = useState('Lv.1');
  const [contents, setContents] = useState("");

  // 아직 DB에 없어서 그냥 빈칸 ㄱ
  const [test1, setTest1] = useState(["",""]); //input, output
  const [test2, setTest2] = useState(["",""]);
  const [test3, setTest3] = useState(["",""]);

  useEffect(() => {
    const prob = probs.filter((x) => x.id === parseInt(param.id!))[0];
    if (prob) {
      setName(prob.title);
      setLevel(prob.level);
      // 나중에 contents나 테스트 케이스도 여기서 초기화해줄 예정
    }
  }, [])

  return (
    <div className="w-full h-full">
      <form className="w-auto h-fit flex flex-col mx-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl mt-5">
        <label htmlFor="algo_name" className="bg-transparent text-xl">Algorithm Name</label>
        <input type="text" id="algo_name" className="bg-white text-xl mb-5" value={name} onChange={(e) => { setName(e.target.value) }} />

        <label htmlFor="algo_name" className="bg-transparent text-xl">Algorithm Level</label>
        <select className="bg-white text-xl mb-5" value={level} onChange={(e) => { setLevel(e.target.value) }}>
          <option>level1</option>
          <option>level2</option>
          <option>level3</option>
          <option>level4</option>
        </select>

        <label htmlFor="algo_content" className="bg-transparent text-xl">Algorithm Contents</label>
        <input type="text" id="algo_content" className="bg-white text-xl mb-5" value={contents} onChange={(e)=>setContents(e.target.value)}/>

        <div className="bg-transparent flex flex-row w-full text-xl">Test Case 1</div>
        <div className="bg-transparent flex flex-row w-full">
          <div className="w-full mr-5  bg-transparent">
            <p className=" bg-transparent">Input</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test1[0]} onChange={(e)=>setTest1([e.target.value, test1[1]])}/>
          </div>
          <div className="w-full bg-transparent">
            <p className=" bg-transparent">Output</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test1[1]} onChange={(e)=>setTest1([test1[0],e.target.value])}/>
          </div>
        </div>

        <div className="bg-transparent flex flex-row w-full text-xl">Test Case 2</div>
        <div className="bg-transparent flex flex-row w-full">
          <div className="w-full mr-5  bg-transparent">
            <p className=" bg-transparent">Input</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test2[0]} onChange={(e)=>setTest2([e.target.value, test2[1]])}/>
          </div>
          <div className="w-full bg-transparent">
            <p className=" bg-transparent">Output</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test2[1]} onChange={(e)=>setTest2([test2[0],e.target.value])}/>
          </div>
        </div>

        <div className="bg-transparent flex flex-row w-full text-xl">Test Case 3</div>
        <div className="bg-transparent flex flex-row w-full">
          <div className="w-full mr-5  bg-transparent">
            <p className=" bg-transparent">Input</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test3[0]} onChange={(e)=>setTest3([e.target.value, test3[1]])}/>
          </div>
          <div className="w-full bg-transparent">
            <p className=" bg-transparent">Output</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test3[1]} onChange={(e)=>setTest3([test3[0],e.target.value])}/>
          </div>
        </div>
        <input type="submit" className="w-fit shadow-xl px-5 py-2 rounded-xl bg-[#a1aada]"/>
      </form>
    </div>
  )
}

export default AddAlgoPage