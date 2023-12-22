import React from 'react'
import { useNavigate } from "react-router-dom"

const AdminNav = () => {

  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <div className="w-auto h-full flex flex-row items-center  mx-5 pl-5 whitespace-nowrap">
        <button className="h-[60px] items-center justify-between whitespace-nowrap hover:cursor-pointer text-white mr-5" onClick={()=>navigate('/admin')}>Home</button>
        <button className="h-[60px] items-center justify-between whitespace-nowrap hover:cursor-pointer text-white mr-5" onClick={()=>navigate('user')}>Users</button>
        <button className="h-[60px] items-center justify-between whitespace-nowrap hover:cursor-pointer text-white mr-5" onClick={()=>navigate('algorithm')}>Algorithms</button>
      </div>
    </div>
  )
}

export default AdminNav