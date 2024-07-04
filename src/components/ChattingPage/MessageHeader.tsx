import React from 'react'

const MessageHeader: React.FC<{ handleSearchChange: any; handleSearchMessages: any; visible: boolean; setVisible: any; searchTerm: string; setSearchTerm: any; setSearchResults:any;}> = ({ handleSearchChange, handleSearchMessages, visible, setVisible, searchTerm, setSearchTerm, setSearchResults }) => {

  return (
    <div className="w-full flex justify-end">
      <form className="w-fit h-fit border-solid border-[.2rem] border-[#ececec] p-2 mb-2 rounded-xl whitespace-nowrap flex justify-center" onSubmit={handleSearchMessages}>
        {visible && <button type="button" className="bg-slate-400 px-3 py-2 text-white rounded-xl mr-2" onClick={() => { setVisible(false); setSearchTerm(""); setSearchResults([])}}>&lt;-</button>}
        <input
          className="p-2 rounded-xl w-full"
          placeholder="  Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <button type="submit" className="ml-2 bg-slate-400 px-3 py-2 text-white rounded-xl">Search</button>
      </form>
    </div>
  )
}

export default MessageHeader