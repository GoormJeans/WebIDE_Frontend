import React from 'react'
import { useNavigate } from "react-router-dom"

function Nav() {

  const navigate = useNavigate();


  return (
    <nav className="w-full h-20 z-1">
      <div className="px-5 w-auto h-full flex justify-between items-center bg-nav-color mx-5 rounded-xl">
        <div className="text-3xl font-k2d left-0 ml-5 hover:cursor-pointer" onClick={() => window.location.replace('/')}>
          JeansCode
        </div>
        <div className="flex flex-row right-0">
          <div className="font-k2d text-[#333333] text-lg mr-5 hover:cursor-pointer hover:underline" onClick={() => navigate("/algorithms")}>
            Algorithms
          </div>
          <div className="font-k2d text-[#333333] text-lg mr-5 hover:cursor-pointer hover:underline" onClick={() => navigate("/mypage")}>
            kim goorm
          </div>
          <div className="font-k2d text-[#333333] text-lg mr-5 hover:cursor-pointer hover:underline">
            Logout
          </div>
          <div className="font-k2d text-[#333333] text-lg mr-5 hover:cursor-pointer hover:underline" onClick={() => navigate("/settings")}>
            Settings
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav