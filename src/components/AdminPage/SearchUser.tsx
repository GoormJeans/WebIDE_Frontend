import React, { useState } from 'react'

const SearchUser: React.FC<{ setSearchTerm: any }> = ({ setSearchTerm }) => {

  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = (data: any) => {
    data.preventDefault();
    setSearchTerm(searchValue);
    setSearchValue("");
  }

  return (
    <div className="w-full h-[70px]">
      <form onSubmit={handleSubmit} className="w-auto h-full flex flex-row justify-between items-center bg-[#c4c4c4] m-5 rounded-xl py-5 px-8 shadow-xl whitespace-nowrap">
        <input
          type="text"
          className="w-5/6 h-full rounded-xl px-4 bg-white"
          value={searchValue}
          onChange={handleChange}
          placeholder="사용자 검색"
        />
        <button className="px-8 h-full bg-black text-white rounded-xl whitespace-nowrap" type="submit">검색</button>
      </form>
    </div>
  )
}

export default SearchUser