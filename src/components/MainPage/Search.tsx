import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const levels: string[] = ['Lv.1', 'Lv.2', 'Lv.3']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // submit 이벤트 발생하면 검색결과화면으로 이동
  const handleSubmit = (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    let value = searchValue;
    navigate(`/search?q=${value}`);
  }

  return (
    <div className="w-full h-[70px] ">
      <form className="w-auto h-full flex flex-row justify-between items-center bg-[#c4c4c4] m-5 rounded-xl py-5" onSubmit={handleSubmit}>
        {/* 모양까지만 완성 알고리즘 레벨 필터 이벤트 추가 예정 */}
        <select className="pl-4 pr-2 h-full bg-black text-white ml-8 rounded-xl">
          <option value="none" className="text-black">레벨</option>
          {levels.map((element: string) =>
            <option value={element} className="text-black" key={element}>{element}</option>
          )}
        </select>
        <input
          type="text"
          className="w-5/6 h-full rounded-xl px-4 bg-white"
          value={searchValue}
          onChange={handleChange}
          placeholder="문제 검색"
        />
        <button className="px-8 h-full bg-black text-white mr-8 rounded-xl" type="submit">검색</button>
      </form>
    </div>
  )
}

export default Search