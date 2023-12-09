import React, { useState } from 'react'

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const levels: string[] = ['Lv.1', 'Lv.2', 'Lv.3']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="w-full h-[70px] ">
      <div className="w-auto h-full flex flex-row justify-between items-center bg-[#c4c4c4] m-5 rounded-xl py-5">
        {/* 모양까지만 완성 알고리즘 레벨 필터 이벤트 추가 예정 */}
        <select className="pl-4 pr-2 h-full bg-black text-white ml-8 rounded-xl">
          <option value="none" className="text-black">레벨</option>
          {levels.map((element: string) =>
          <option value={element} className="text-black">{element}</option>
          )}
        </select>
        <input
          type="text"
          className="w-5/6 h-full rounded-xl px-4 bg-white"
          value={searchValue}
          onChange={handleChange}
          placeholder="문제 검색"
        />
        {/* 모양까지만 완성 알고리즘 검색 이벤트 추가 예정 */}
        <button className="px-8 h-full bg-black text-white mr-8 rounded-xl">검색</button>
      </div>
    </div>
  )
}

export default Search