import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router"
import AlgoList from "../components/MainPage/AlgoList";
import { Algorithm } from "../types/Algorithm.type";
import axios from "../api/axios"
import Search from "../components/MainPage/Search";


const AdminAlgoPage = () => {
  const navigate = useNavigate();

  const [probs, setProbs] = useState<Algorithm[]>([]);

  //search logic
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState('레벨');
  const [initProbs, setInitProbs] = useState<Algorithm[]>([]);
  const levels: string[] = ['레벨', 'Lv.1', "Lv.2", 'Lv.3', 'Lv.4'];


  // DB에서 probs 가져오기
  useEffect(() => {
    const fetchProbs = async () => {
      try {
        const request = await axios.get('/admin/algorithm');
        setInitProbs(request.data.data[0])
        setProbs(request.data.data[0])
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProbs();
  }, [])

    // 여기서 검색결과 필터링 해서 AlgoList에 prop으로 넘겨줌
    useEffect(() => {
      setProbs(initProbs)
      //필터에 따라 prob 정리
      if (filter !== '레벨' && searchTerm !== null && searchTerm.trim().length !== 0) {
        setProbs(Object.values(initProbs).filter((element) => levels[element.level] === filter && element.name.includes(searchTerm.trim())))
        return;
      }
  
      //필터에 따라 prob 정리
      if (filter !== '레벨') {
        setProbs(Object.values(initProbs).filter((element) => levels[element.level] === filter))
        return;
      }
  
      //검색어가 있는 경우 probs 필터
      if (searchTerm !== null && searchTerm.trim().length !== 0) {
        setProbs(Object.values(initProbs).filter((element) => element.name.includes(searchTerm.trim())));
        return;
      }
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, searchTerm])
  

  return (
    <div className="w-full h-full">
      <button className="w-auto h-fit flex flex-col mx-5 mt-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl hover:bg-[#8a96d3]" onClick={() => navigate('addalgo')}>Add Algorithm Problem</button>
      <Search setFilter={setFilter} levels={levels} setSearchTerm={setSearchTerm} />
      <div className="w-auto h-fit flex flex-col mx-5 mt-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl">
        <AlgoList probs={probs} />
      </div>
    </div>
  )
}

export default AdminAlgoPage