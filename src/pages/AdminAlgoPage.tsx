import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router"
import AlgoList from "../components/MainPage/AlgoList";
import { Algorithm } from "../types/Algorithm.type";
import axios from "../api/axios"


const AdminAlgoPage = () => {
  const navigate = useNavigate();

  const [probs, setProbs] = useState<Algorithm[]>([]);

  // DB에서 probs 가져오기
  useEffect(() => {
    const fetchProbs = async () => {
      try {
        const request = await axios.get('/api/problems');
        setProbs(request.data)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProbs();
  }, [])

  return (
    <div className="w-full h-full">
      <button className="w-auto h-fit flex flex-col mx-5 mt-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl hover:bg-[#8a96d3]" onClick={() => navigate('addalgo')}>Add Algorithm Problem</button>
      <div className="w-auto h-fit flex flex-col mx-5 mt-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl">
        For Algorithm List
        <AlgoList probs={probs} />
      </div>
    </div>
  )
}

export default AdminAlgoPage