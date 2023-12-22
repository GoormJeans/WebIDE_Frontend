import React, { useState } from 'react'
import UserComponent from "./UserComponent";
import { UserInfo } from "../../types/UserInfo.type";

const UserList: React.FC<{ users: UserInfo[] }> = ({ users }) => {

  // Pagination용 데이터
  const [page, setPage] = useState(1);
  const limit = 10; // 한 번에 보여줄 문제 수
  const offset = (page - 1) * limit; // 문제 번호 단위
  const numPages = Math.ceil((users?.length || 0) / limit); // pagination 개수
  if (numPages > 1) { users = users.slice(offset, offset + limit) } //1페이지 이상일 경우에만 작동

  const pageButtons = new Array(numPages).fill(0);

  return (
    <div className="w-auto h-full flex flex-col justify-between items-center  bg-nav-color m-5 rounded-xl px-5 pt-5 border-2 whitespace-nowrap">
      {
        users && Array.isArray(users) &&
        users.map((element) =>
          <UserComponent
            key={element.social_id}
            id={element.social_id}
            nickname={element.nickname}
            email={element.email}
          />)
      }

      {/* Pagination 1페이지 하나 이상 나올 경우에 보여주기*/}
      {numPages > 1 && (<div className="justify-between text-white w-1/4 flex flex-row whitespace-nowrap">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="text-3xl">&lt;</button>
        {pageButtons &&
          pageButtons.map((item, idx) =>
            <button key={idx + 1} onClick={() => setPage(idx + 1)} className={idx + 1 === page ? "rounded-full text-2xl border-1" : "text-2xl"}>
              {idx + 1}
            </button>
          )
        }
        <button onClick={() => setPage(page + 1)} disabled={page === numPages} className="text-3xl">&gt;</button>
      </div>)}
    </div>
  );
}

export default UserList