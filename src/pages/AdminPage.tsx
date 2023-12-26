import { useNavigate } from "react-router-dom"
import UserChart from "../components/AdminPage/UserChart";
import LangChart from "../components/AdminPage/LangChart";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const AdminPage = () => {

  const navigate = useNavigate();
  const [usersCounts, setUsersCounts] = useState<string[]>([]);
  const [algos, setAlgos] = useState<any[]>([])

  //언어별 정답 수 , 일별 가입자 수 가져오기
  useEffect(() => {
    
    const getAdminDashboard = async ()=>{
      try {
        const request = await axios.get('/admin');
        setUsersCounts([...request.data.data[0].userCounts])
        setAlgos([...request.data.data[0].algos])
      } catch (error) {
        console.log(error);
      }
    }

    getAdminDashboard();
  }, [])
  

  return (
    <div className="w-full h-full">
      <div className="w-auto h-80 flex flex-col mx-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl">
        <p className=" w-fit text-3xl  hover:cursor-pointer mb-3" onClick={() => navigate('user')}>Users</p>
        <UserChart userCounts={usersCounts}/>
      </div>
      <div className="w-auto h-fit flex flex-col mx-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl mt-5">
        <p className=" w-fit text-3xl  hover:cursor-pointer mb-3" onClick={() => navigate('algorithm')}>Algorithms</p>
        <LangChart algos={algos}/>
      </div>
    </div>
  )
}

export default AdminPage