import React, { useEffect, useState } from 'react'
import LastAlgo from "../components/MainPage/LastAlgo"
import Search from "../components/MainPage/Search"
import AlgoList from "../components/MainPage/AlgoList"
import { Algorithm } from "../types/Algorithm.type"
import { fetchProblemsApi } from '../api/api'


const DetailPage = () => {

  const [initProbs, setInitProbs] = useState<Algorithm[]>([]);
  const [probs, setProbs] = useState<Algorithm[]>([]);
  const [filter, setFilter] = useState('태그');
  const [searchTerm, setSearchTerm] = useState("");
  const [unsolved, setUnsolved] = useState<Algorithm[]>([]);
  const tags : string[]  = ['태그','Recursion', 'Two Pointer', 'Search', 'Backtracking', 'Sort', 'sort', 'Linked List', 'String', 'Math'];
  // DB에서 probs 가져오기
  useEffect(() => {
    const fetchProbs = async () => {
      try {
        const data = await fetchProblemsApi();
        setInitProbs(data);
        setProbs(data);
        setUnsolved(data ? data.filter((x: Algorithm) => !x.solved) : []);
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
    if (filter !== '태그' && searchTerm !== null && searchTerm.trim().length !== 0) {
      setProbs(Object.values(initProbs).filter((element) => element.tag === filter && element.name.includes(searchTerm.trim())))
      return;
    }

    //필터에 따라 prob 정리
    if (filter !== '태그') {
      setProbs(Object.values(initProbs).filter((element) => element.tag === filter))
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
      <div className='w-full h-auto'>
        <div className='px-5 py-5 w-auto h-full mx-5 my-5 rounded-3xl bg-nav-color shadow-xl'>
          <Search setFilter={setFilter} levels={tags} setSearchTerm={setSearchTerm} />
          <AlgoList probs={probs} />
        </div>
      </div>
    </div >
  )
}

export default DetailPage
