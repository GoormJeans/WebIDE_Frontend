import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../api/store";
import { levels, setFilterLevel } from "../../api/filter";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // submit 이벤트 발생하면 검색결과화면으로 이동
  const handleSubmit = (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    let value = searchValue;
    navigate(`/search?q=${value}`);
  }

  //필터 선택 이벤트
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterLevel(e.target.value));
  }

  return (
    <div className="w-full h-[70px]">
      <form className="w-auto h-full flex flex-row justify-between items-center bg-[#c4c4c4] m-5 rounded-xl py-5 shadow-xl whitespace-nowrap" onSubmit={handleSubmit}>
        {/* 레벨 선택에 따라 redux에 level state 변경 */}
        <select className="pl-4 pr-2 h-full bg-black text-white ml-8 rounded-xl" onChange={handleFilterChange}>
          {levels.map((element: string) =>
            <option value={element} className="text-black whitespace-nowrap" key={element}>{element}</option>
          )}
        </select>
        <input
          type="text"
          className="w-5/6 h-full rounded-xl px-4 bg-white"
          value={searchValue}
          onChange={handleChange}
          placeholder="문제 검색"
        />
        <button className="px-8 h-full bg-black text-white mr-8 rounded-xl whitespace-nowrap" type="submit">검색</button>
      </form>
    </div>
  )
}

export default Search