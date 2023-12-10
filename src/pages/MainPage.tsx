import React from 'react'
import LastAlgo from "../components/MainPage/LastAlgo"
import Search from "../components/MainPage/Search"
import AlgoList from "../components/MainPage/AlgoList"
import { useLocation } from "react-router-dom"

const MainPage = () => {

    // url에서 검색어 찾아내기
    const useQuery = () => {
      return new URLSearchParams(useLocation().search);
    }
    let searchTerm = useQuery().get("q");
  return (
    <div>
      <LastAlgo />
      <Search />
      <AlgoList searchTerm={searchTerm}/>
    </div >
  )
}

export default MainPage
