import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-5 my-5 px-5 py-5 rounded-3xl bg-nav-color shadow-xl flex items-center flex-col">
      <p className="text-4xl">Page Not Found</p>
      <button className="mt-5 w-fit shadow-xl px-5 py-2 rounded-xl bg-blue-300 mr-3 hover:bg-blue-200" onClick={()=>navigate('/')}>Home Page</button>
    </div>
  )
}

export default NotFoundPage