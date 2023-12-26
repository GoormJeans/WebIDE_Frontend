import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "../../api/axios"
import { UserInfo } from './../../types/UserInfo.type';

const UserComponent: React.FC<{id:string;nickname:string;email:string}> = ({ id, nickname, email }) => {

  const navigate = useNavigate();
  const [deleteMod, setDeleteMod] = useState(false);

  const handleDelete = async () => {
    try {
      const response = axios.delete(`/api/admin/user/${id}`);
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
    window.location.replace("/admin/user");
  }

  return (
    deleteMod ?
      <div className="w-full bg-[#c4c4c4] h-[60px] flex flex-row items-center justify-between p-6 pr-0 mb-5 rounded-xl shadow-xl whitespace-nowrap">
        <div className="w-full flex justify-end text-2xl">{nickname} 삭제 하시겠습니까?</div>
        <div className="w-full flex justify-end items-center">
          <button className="p-5 h-[60px] bg-red-500 w-fit text-white hover:bg-red-300 items-center" onClick={handleDelete}>YES</button>
          <button className="p-5 h-[60px] bg-blue-500 w-fit text-white hover:bg-blue-300 items-center" onClick={() => setDeleteMod(false)}>NO</button>
        </div>
      </div>
      :
      <div className="w-full bg-[#c4c4c4] h-[60px] flex flex-row items-center justify-between p-6 mb-5 rounded-xl shadow-xl whitespace-nowrap">
        <div className="bg-transparent flex flex-row justify-center whitespace-nowrap">
          <p className="bg-transparent">{id}</p>
          <p className="bg-transparent ml-3">{nickname}</p>
          <p className="bg-transparent ml-3">{email}</p>
        </div>
        <button className="text-xl text-red-600" onClick={() => setDeleteMod(true)}>Delete</button>
      </div>
  )
}

export default UserComponent