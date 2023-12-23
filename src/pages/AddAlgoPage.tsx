import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import AlgorithmContent from "../components/AdminPage/AlgorithmContent";
import axios from "../api/axios"
import { Algorithm } from "../types/Algorithm.type";


const AddAlgoPage = () => {

  const navigate = useNavigate();

  const levels: string[] = ['레벨', 'Lv.1', "Lv.2", 'Lv.3', 'Lv.4'];
  const tags: string[] = ['태그', 'Array', 'Math', 'String', 'Two Pointers', 'Linked List', 'Hash Table', 'Backtracking']
  const param = useParams();
  const [name, setName] = useState("");
  const [level, setLevel] = useState('레벨');
  const [tag, setTag] = useState('태그');
  const [contents, setContents] = useState("");

  // 아직 DB에 없어서 그냥 빈칸 ㄱ
  const [test1, setTest1] = useState(["", ""]); //input, output
  const [test2, setTest2] = useState(["", ""]);
  const [test3, setTest3] = useState(["", ""]);

  // DB에서 probs 가져오기
  useEffect(() => {
    if (!isNaN(parseInt(param.id!))) {
      const fetchProb = async () => {
        try {
          const request = await axios.get(`/api/admin/problems/${param.id}`); //id에 해당하는 문제의 정보 불러오는 코드
          const prob: Algorithm = request.data;
          setLevel(levels[prob.level]);
          setName(prob.name);
          setTag(prob.tag);

        } catch (error) {
          console.log("error", error);
        }
      };
      fetchProb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = () => {

    // 태그 제대로 선택안하면 경고
    if (tag === '태그') {
      alert('태그를 선택하세요');
      return;
    }

    // 레벨 제대로 선택안하면 경고
    if (level === '레벨') {
      alert('레벨을 선택하세요');
      return;
    }

    const updateProb = async () => {
      try {

        if (!isNaN(parseInt(param.id!))) { //문제 수정
          const response = await axios.post(`/api/admin/problems/${param.id}`, {
            algorithmName: name,
            tag: tag,
            testCase: [test1, test2, test3],
            content: contents
          });
          console.log(response.data);
        } else { //문제 추가
          const response = await axios.post('/api/admin/problems', {
            algorithmName: name,
            tag: tag,
            testCase: [test1, test2, test3],
            content: contents
          });
          console.log(response.data);
        }

      } catch (error) {
        console.log("error", error);
      }
    }
    updateProb();

    navigate('/admin/algorithm');
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/admin/problems/${param.id}`);
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
    navigate('/admin/algorithm');
  }

  return (
    <div className="w-full h-full">
      <form className="w-auto h-fit flex flex-col mx-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl mt-5" onSubmit={handleSubmit}>
        <label htmlFor="algo_name" className="text-xl">Algorithm Name</label>
        <input type="text" id="algo_name" className="bg-white text-xl mb-5" value={name} onChange={(e) => { setName(e.target.value) }} />

        <div className="w-full flex flex-row">
          <div className="w-full flex flex-col">
            <label htmlFor="algo_name" className="text-xl">Algorithm Level</label>
            <select className="bg-white text-xl mb-5" value={level} onChange={(e) => { setLevel(e.target.value) }} >
              {levels.map((level, idx) =>
                <option key={idx + 'level'}>{level}</option>
              )}
            </select>
          </div>
          <div className="w-full flex flex-col ml-5">
            <label htmlFor="algo_name" className="text-xl">Algorithm Tag</label>
            <select className="bg-white text-xl mb-5" value={tag} onChange={(e) => { setTag(e.target.value) }} >
              {tags.map((tag, idx) =>
                <option key={idx + 'tag'}>{tag}</option>
              )}
            </select>
          </div>
        </div>
        <div className="flex flex-row w-full text-xl">Test Case 1</div>
        <div className="flex flex-row w-full">
          <div className="w-full mr-5">
            <p>Input</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test1[0]} onChange={(e) => setTest1([e.target.value, test1[1]])} />
          </div>
          <div className="w-full ">
            <p className=" ">Output</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test1[1]} onChange={(e) => setTest1([test1[0], e.target.value])} />
          </div>
        </div>

        <div className=" flex flex-row w-full text-xl">Test Case 2</div>
        <div className=" flex flex-row w-full">
          <div className="w-full mr-5  ">
            <p className=" ">Input</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test2[0]} onChange={(e) => setTest2([e.target.value, test2[1]])} />
          </div>
          <div className="w-full ">
            <p className=" ">Output</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test2[1]} onChange={(e) => setTest2([test2[0], e.target.value])} />
          </div>
        </div>

        <div className=" flex flex-row w-full text-xl">Test Case 3</div>
        <div className=" flex flex-row w-full">
          <div className="w-full mr-5  ">
            <p className=" ">Input</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test3[0]} onChange={(e) => setTest3([e.target.value, test3[1]])} />
          </div>
          <div className="w-full ">
            <p className=" ">Output</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" value={test3[1]} onChange={(e) => setTest3([test3[0], e.target.value])} />
          </div>
        </div>
        <AlgorithmContent contents={contents} setContents={setContents} />

        <div className="w-full flex flex-row justify-end mt-5">
          <button type="submit" className="w-fit shadow-xl px-5 py-2 rounded-xl bg-blue-300 mr-3 hover:bg-blue-200" >Submit</button>
          <button type="button" className="w-fit shadow-xl px-5 py-2 rounded-xl bg-red-500 mr-3 hover:bg-red-400" onClick={handleDelete}>Delete</button>
          <button type="button" className="w-fit shadow-xl px-5 py-2 rounded-xl bg-gray-400 hover:bg-gray-300" onClick={() => navigate('/admin/algorithm')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddAlgoPage