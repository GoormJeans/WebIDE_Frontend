import React, { useState } from 'react'
import AlgoProbs from './AlgoProbs';
import { Algorithm } from "../../types/Algorithm.type";

const AlgoList: React.FC<{probs: Algorithm[]}> = ({ probs }) => {

  // Pagination용 데이터
  const [page, setPage] = useState(1);
  const limit = 10; // 한 번에 보여줄 문제 수
  const offset = (page - 1) * limit; // 문제 번호 단위
  const numPages = Math.ceil(probs.length / limit); // pagination 개수
  if (numPages > 1) { probs = probs.slice(offset, offset + limit) } //1페이지 이상일 경우에만 작동

  const pageButtons = new Array(numPages).fill(0);

  if (probs.length > 0) { //검색결과가 있는 경우
    return (
      <div className="w-full h-full ">
        <div className="w-auto h-full flex flex-col justify-between items-center bg-transparent m-5 rounded-xl px-5 pt-5 border-2 whitespace-nowrap">
          {
            probs.map((element) => <AlgoProbs prob={element} key={element.id} />)
          }

          {/* Pagination 1페이지 하나 이상 나올 경우에 보여주기*/}
          {numPages > 1 && (<div className="justify-between text-white w-1/4 flex flex-row whitespace-nowrap">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="text-3xl">&lt;</button>
            {
              pageButtons.map((item, idx) =>
                <button key={idx + 1} onClick={() => setPage(idx + 1)} className={idx + 1 === page ? "rounded-full text-2xl border-1" : "text-2xl"}>
                  {idx + 1}
                </button>
              )
            }
            <button onClick={() => setPage(page + 1)} disabled={page === numPages} className="text-3xl">&gt;</button>
          </div>)}
        </div>
      </div>
    );
  }
  else { // 검색결과가 없는 경우
    return (
      <div className="w-full h-full ">
        <div className="w-auto h-full flex flex-col justify-between items-center bg-transparent m-5 rounded-xl p-5 border-2 text-white">
          검색결과가 없습니다.
        </div>
      </div>
    );
  }
}

export default AlgoList;