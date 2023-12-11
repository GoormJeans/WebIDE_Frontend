import React from 'react'
import { useSelector } from "react-redux"
import { RootState } from "../../api/store"
import { Problem } from "../../api/algoprob";
import AlgoProbs from './AlgoProbs';

// Prop을 넘기기위한 Type, 이 방법보다 더 좋은 방법이 있다면 알려주세요 ㅠ
interface AlgoListType {
  searchTerm: string | null;
}

const AlgoList: React.FC<AlgoListType> = ({ searchTerm }) => {

  let probs: Problem[] = useSelector((state: RootState) => state.problems);

  const setting: any = useSelector((state: RootState) => state.filter);
  console.log(setting);


  //필터에 따라 prob 정리
  if(setting.level !== '레벨') {
    probs = probs.filter((element) => element.level === setting.level)
  }

  //검색어가 있는 경우 다르게 렌더링
  if (searchTerm === null || searchTerm.length === 0) { // 그냥 메인페이지이거나 검색어가 없는 경우
    return (
      <div className="w-full h-full ">
        <div className="w-auto h-full flex flex-col justify-between items-center bg-transparent m-5 rounded-xl px-5 pt-5 border-2 whitespace-nowrap">
          {
            probs.map((element) => <AlgoProbs prob={element} key={element.id} />)//아직 Pagination 미구현
          }
        </div>
      </div>
    )
  }
  else { //검색어가 있는 경우
    //검색결과에 따라 나누기

    let searchResult = probs.filter((element) => element.title.includes(searchTerm))

    if (searchResult.length > 0) { //검색결과가 있는 경우
      return (
        <div>
          <div className="w-full h-full ">
            <div className="w-auto h-full flex flex-col justify-between items-center bg-transparent m-5 rounded-xl px-5 pt-5 border-2 whitespace-nowrap">
              {
                searchResult.map((element) => <AlgoProbs prob={element} key={element.id} />)//아직 Pagination 미구현
              }
            </div>
          </div>
        </div>
      );
    }
    else { // 검색결과가 없는 경우
      return (
        <div>
          <div className="w-full h-full ">
            <div className="w-auto h-full flex flex-col justify-between items-center bg-transparent m-5 rounded-xl p-5 border-2 text-white">
              검색결과가 없습니다.
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AlgoList;