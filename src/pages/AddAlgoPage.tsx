import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import AlgorithmContent from "../components/AdminPage/AlgorithmContent";
import axios from "../api/axios"
import TestCaseInput from "../components/AdminPage/TestCaseInput";
import { AdminAlgo } from "./AdminAlgoPage";

interface AdminAlgorithm extends AdminAlgo {
  answers: string[];
  testcases: string[];
  description: string;
}

const AddAlgoPage = () => {

  const navigate = useNavigate();

  const levels: string[] = ['레벨', 'Lv.1', "Lv.2", 'Lv.3', 'Lv.4'];
  const tags: string[] = ['태그', 'Array', 'Math', 'String', 'Two Pointers', 'Linked List', 'Hash Table', 'Backtracking', "Sort", 'Search']
  const param = useParams();
  const [name, setName] = useState("");
  const [level, setLevel] = useState('레벨');
  const [tag, setTag] = useState('태그');
  const [description, setDescription] = useState(
    '### 문제 제목\n' +
    "문제 제목 작성하세요\n\n" +
    '### 문제 설명\n' +
    '문제 설명 작성하세요\n\n' +
    '### 제한사항\n' +
    '-  제한사항을 작성하세요\n' +
    '\n' +
    '### 입출력 양식\n' +
    '|input|output|\n' +
    '|-|-|\n' +
    '\n' +
    '### 입출력 예 설명\n' +
    '입출력 예 1\n\n' +
    '입출력 예 2\n'
  );

  // 테스트케이스 추가하는 방식으로 가기
  // 테스트 케이스는 무조건 배열 방식으로 전송
  const [input, setInput] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);

  // DB에서 probs 가져오기
  useEffect(() => {
    if (!isNaN(parseInt(param.id!))) {
      const fetchProb = async () => {
        try {
          const request = await axios.get(`/admin/algorithm/${param.id}`); //id에 해당하는 문제의 정보 불러오는 코드
          console.log(request.data.data[0]);
          const prob: AdminAlgorithm = request.data.data[0];
          setLevel(levels[prob.level]);
          setName(prob.algorithmName);
          setTag(prob.tag);
          setInput([...prob.testcases]);
          setOutput([...prob.answers]);
          setDescription(prob.description);

        } catch (error) {
          console.log("error", error);
        }
      };
      fetchProb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e: any) => {

    e.preventDefault();

    if (name.length === 0) {
      alert('문제 제목을 입력하세요.');
      return;
    }

    if (level === '레벨') {
      alert('레벨을 선택하세요.');
      return;
    }

    if (input.length === 0 && output.length === 0) {
      alert('테스트 케이스를 1개 이상 입력하세요.');
      return;
    }

    if (input.filter(x => x.length === 0).length + output.filter(x => x.length === 0).length > 0) {
      alert('테스트 케이스는 전부 입력해야합니다.');
      return;
    }

    const updateProb = async () => {
      try {
        if (!isNaN(parseInt(param.id!))) { //문제 수정
          const response = await axios.patch(`/admin/algorithm/${param.id}`, {
            algorithmName: name,
            level: levels.indexOf(level),
            tag: tag,
            testcases: input,
            answers: output,
            description: description
          });
          console.log(response.data);
          navigate('/admin/algorithm');
        } else { //문제 추가
          const response = await axios.post('/admin/algorithm/add', {
            algorithmName: name,
            level: levels.indexOf(level),
            tag: tag,
            testcases: input,
            answers: output,
            description: description
          });
          console.log(response.data);
          navigate('/admin/algorithm');
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    updateProb();
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/admin/algorithm/${param.id}`);
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
    navigate('/admin/algorithm');
  }

  const handleAddTC = (e: any) => {
    e.preventDefault()
    input.push("");
    setInput([...input]);
    output.push("");
    setOutput([...output]);
  }

  const handleRemoveTC = (e: any) => {
    e.preventDefault();
    const id = e.target.id
    input.splice(id, 1);
    output.splice(id, 1);
    setInput([...input]);
    setOutput([...output]);
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
        {input.length !== 0 && input.map((_, idx) =>
          <TestCaseInput key={idx} id={idx} input={input} setInput={setInput} output={output} setOutput={setOutput} handleRemoveTC={handleRemoveTC} />
        )}
        <button className="hover:text-gray-500" onClick={handleAddTC}>테스트 케이스 추가</button>
        <AlgorithmContent description={description} setDescription={setDescription} />

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