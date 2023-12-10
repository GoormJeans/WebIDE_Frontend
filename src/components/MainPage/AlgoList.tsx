import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../api/store"
import { Problem } from "../../api/algoprob";
import { useNavigate } from "react-router-dom";

// Prop을 넘기기위한 Type, 이 방법보다 더 좋은 방법이 있다면 알려주세요 ㅠ
interface AlgoListType {
  searchTerm: string | null;
}

const AlgoList: React.FC<AlgoListType> = ({ searchTerm }) => {

  const dispatch = useDispatch<AppDispatch>();
  const probs: Problem[] = useSelector((state: RootState) => state.problems);
  const navigate = useNavigate();

  //알고리즘 리스트 항목 타입
  interface AlgoProbsProps {
    prob: Problem;
  }
  //알고리즘 리스트 항목
  const AlgoProbs: React.FC<AlgoProbsProps> = ({ prob }) => (
    <div className="w-full bg-[#c4c4c4] h-[60px] flex flex-row items-center justify-between p-6 mb-5 rounded-xl hover:cursor-pointer hover:bg-white"
      onClick={() => navigate('/editor')}//클릭 시 editor 페이지로 이동, 나중에 id를 이용해서 문제 페이지로 이동시키는 방식으로 하면 될 듯
    >
      <div className="bg-transparent flex flex-row">
        <p className="bg-transparent w-4">{prob.solved && "O"}</p>{/* 문제 풀었으면 O로 표시 */}
        <p className="bg-transparent ml-3">{prob.title}</p>
      </div>
      <p className="bg-transparent">{prob.level}</p>
    </div>
  )

  //검색어가 있는 경우 다르게 렌더링
  if (searchTerm === null || searchTerm.length === 0) { // 그냥 메인페이지이거나 검색어가 없는 경우
    return (
      <div className="w-full h-full ">
        <div className="w-auto h-full flex flex-col justify-between items-center bg-transparent m-5 rounded-xl px-5 pt-5 border-2">
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
            <div className="w-auto h-full flex flex-col justify-between items-center bg-transparent m-5 rounded-xl px-5 pt-5 border-2">
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