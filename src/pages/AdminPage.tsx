import { useNavigate } from "react-router-dom"
import UserChart from "../components/AdminPage/UserChart";
import LangChart from "../components/AdminPage/LangChart";

const AdminPage = () => {

  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <div className="w-auto h-80 flex flex-col mx-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl">
        <p className=" w-fit text-3xl  hover:cursor-pointer mb-3" onClick={() => navigate('user')}>Users</p>
        <UserChart />
      </div>
      <div className="w-auto h-fit flex flex-col mx-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl mt-5">
        <p className=" w-fit text-3xl  hover:cursor-pointer mb-3" onClick={() => navigate('algorithm')}>Algorithms</p>
        <LangChart />
      </div>
    </div>
  )
}

export default AdminPage