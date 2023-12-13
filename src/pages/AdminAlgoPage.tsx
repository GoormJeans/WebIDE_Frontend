import React from 'react'
import { useNavigate } from "react-router"

const AdminAlgoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <button className="w-auto h-fit flex flex-col mx-5 mt-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl hover:bg-[#8a96d3]" onClick={()=>navigate('addalgo')}>Add Algorithm Problem</button>
      <div className="w-auto h-fit flex flex-col mx-5 mt-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl">
        For Algorithm List
        {/* 코드 합친 후 코드 재활용 예정 */}
        {/* <AlgoList probs={probs} /> */}
      bubu</div>
    </div>
  )
}

export default AdminAlgoPage