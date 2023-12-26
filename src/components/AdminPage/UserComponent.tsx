import React from 'react'
import { UserType } from "../../pages/AdminUsersPage"
import { useNavigate } from 'react-router-dom';

const UserComponent: React.FC<UserType> = ({ id, nickname, email }) => {

  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#c4c4c4] h-[60px] flex flex-row items-center justify-between p-6 mb-5 rounded-xl shadow-xl whitespace-nowrap">
      <div className=" flex flex-row justify-center">
        <p className=" w-4">{id}</p>
        <p className=" ml-3">{nickname}</p>
        <p className=" ml-3">{email}</p>
      </div>
      <button className="text-xl text-red-600" onClick={() => navigate(`/delete/${id}`)}>Delete</button>
    </div>
  )
}

export default UserComponent