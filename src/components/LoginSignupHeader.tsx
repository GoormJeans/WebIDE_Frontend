import React from 'react'
import { Link } from 'react-router-dom';

interface LoginSignupHeaderProps {
  content: string;
}

const LoginSignupHeader: React.FC<LoginSignupHeaderProps> = ({ content }) => {
  return (
    <div className='grid justify-items-end'>
      <Link to={content === "Login" ? "/login" : "/sign-up"} className=' underline text-lg bg-transparent pt-10 pr-7'>{content}</Link>
    </div>
  )
}

export default LoginSignupHeader
