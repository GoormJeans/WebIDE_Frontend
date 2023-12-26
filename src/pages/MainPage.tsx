import React, { useEffect, useState } from 'react'
import LastAlgo from "../components/MainPage/LastAlgo"
import Search from "../components/MainPage/Search"
import AlgoList from "../components/MainPage/AlgoList"
import { Algorithm } from "../types/Algorithm.type"
import axios from "../api/axios"

const MainPage = () => {

  const [initProbs, setInitProbs] = useState<Algorithm[]>([]);
  const [probs, setProbs] = useState<Algorithm[]>([]);
  const [filter, setFilter] = useState('레벨');
  const [searchTerm, setSearchTerm] = useState("");
  const [unsolved, setUnsolved] = useState<Algorithm[]>([])
  const levels: string[] = ['레벨', 'Lv.1', "Lv.2", 'Lv.3', 'Lv.4'];

  // DB에서 probs 가져오기
  useEffect(() => {
    const fetchProbs = async () => {
      try {
        const request = await axios.get('/api/problems');
        if (request.status === 200) {
          setInitProbs(request.data)
          setProbs(request.data)
          setUnsolved(request.data.filter((x: Algorithm) => x.solved))
        }
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
    <div>
      <LastAlgo prob={unsolved[Math.floor(Math.random() * unsolved.length)]} />
      <Search setFilter={setFilter} levels={levels} setSearchTerm={setSearchTerm} />
      <AlgoList probs={probs} />
    </div >
  )
}

export default MainPage
