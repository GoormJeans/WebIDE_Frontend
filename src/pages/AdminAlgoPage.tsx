import React from 'react'
import { useNavigate } from "react-router"
import AlgoList from "../components/MainPage/AlgoList";
import { useSelector } from "react-redux";
import { RootState } from "../api/store";

const AdminAlgoPage = () => {
  const navigate = useNavigate();

  const probs = useSelector((state: RootState) => state.problems);

  return (
    <div className="w-full h-full">
      <button className="w-auto h-fit flex flex-col mx-5 mt-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl hover:bg-[#8a96d3]" onClick={()=>navigate('addalgo')}>Add Algorithm Problem</button>
      <div className="w-auto h-fit flex flex-col mx-5 mt-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl">
        For Algorithm List
        <AlgoList probs={probs} />
      </div>
    </div>
  )
}

export default AdminAlgoPage