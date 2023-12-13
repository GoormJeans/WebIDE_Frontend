import React from 'react'
import LastAlgo from "../components/MainPage/LastAlgo"
import Search from "../components/MainPage/Search"
import AlgoList from "../components/MainPage/AlgoList"
import { useLocation } from "react-router-dom"
import { Problem } from "../api/algoprob"
import { useSelector } from "react-redux"
import { RootState } from "../api/store"

const MainPage = () => {

  // url에서 검색어 찾아내기
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let searchTerm = useQuery().get("q");

  // 여기서 검색결과 필터링 해서 AlgoList에 prop으로 넘겨줌
  let probs: Problem[] = useSelector((state: RootState) => state.problems);
  const setting: any = useSelector((state: RootState) => state.filter);

  //필터에 따라 prob 정리
  if (setting.level !== '레벨') {
    probs = probs.filter((element) => element.level === setting.level)
  }

  //검색어가 있는 경우 probs 필터
  if (searchTerm !== null && searchTerm.length !== 0) {
    probs = probs.filter((element) => element.title.includes(searchTerm?searchTerm:""))
  }

  return (
    <div>
      <LastAlgo />
      <Search />
      <AlgoList probs={probs} />
    </div >
  )
}

export default MainPage
