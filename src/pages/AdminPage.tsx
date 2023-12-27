import { useNavigate } from "react-router-dom"
import UserChart from "../components/AdminPage/UserChart";
import LangChart from "../components/AdminPage/LangChart";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {

  const navigate = useNavigate();
  const [counts, setCounts] = useState<any[]>([]);

  //언어별 정답 수 , 일별 가입자 수 가져오기
  useEffect(() => {
    
    const getAdminDashboard = async ()=>{
      try {
        const request = await axios.get('http://localhost:3003/admin');
        console.log(request.data.data);
        setCounts(request.data.data)
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
        <UserChart counts={counts}/>
      </div>
      <div className="w-auto h-fit flex flex-col mx-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl mt-5">
        <p className=" w-fit text-3xl  hover:cursor-pointer mb-3" onClick={() => navigate('algorithm')}>Algorithms</p>
        <LangChart counts={counts}/>
      </div>
    </div>
  )
}

export default AdminPage