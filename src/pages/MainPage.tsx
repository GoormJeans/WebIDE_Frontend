import React, { useEffect, useState } from 'react'
import LastAlgo from "../components/MainPage/LastAlgo"
import Search from "../components/MainPage/Search"
import AlgoList from "../components/MainPage/AlgoList"
import { Algorithm } from "../types/Algorithm.type"
import axios from "../api/axios"

const MainPage = () => {

  const [solved, setSolved] = useState<number[]>([]);
  const [initPrbos, setInitPrbos] = useState<Algorithm[]>([]);
  const [probs, setProbs] = useState<Algorithm[]>([]);
  const [filter, setFilter] = useState('레벨');
  const [searchTerm, setSearchTerm] = useState("");

  const levels: string[] = ['레벨', 'Lv.1', "Lv.2", 'Lv.3', 'Lv.4'];

  // DB에서 probs 가져오기
  useEffect(() => {
    const fetchProbs = async () => {
      try {
        const request = await axios.get('/algorithms');
        setInitPrbos(request.data.algorithms)
        setSolved(request.data.solved);
        setProbs(request.data.algorithms)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProbs();
  }, [])

  // 여기서 검색결과 필터링 해서 AlgoList에 prop으로 넘겨줌
  useEffect(() => {
    setProbs(initPrbos)
    console.log('initprobs', initPrbos);
    console.log('probs', probs);

    //필터에 따라 prob 정리
    if (filter !== '레벨') {
      setProbs(initPrbos.filter((element) => levels[element.level] === filter))
    }

    //검색어가 있는 경우 probs 필터
    if (searchTerm !== null && searchTerm.length !== 0) {
      setProbs(initPrbos.filter((element) => element.name.includes(searchTerm ? searchTerm : "")))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, searchTerm])

  return (
    <div>
      <LastAlgo />
      <Search setFilter={setFilter} levels={levels} setSearchTerm={setSearchTerm} />
      <AlgoList probs={probs} solved={solved} />
    </div >
  )
}

export default MainPage
