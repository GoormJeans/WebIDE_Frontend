import React from 'react'
import LoginSignupHeader from '../components/LoginSignupHeader'
import AnimatedHighFive from '../components/Login/AnimatedHand'
import { useMediaQuery } from '@mui/material'
import { mobileMaxWidthMediaQuery } from '../utils/mediaQueries'
import BannerText from '../components/Login/BannerText'
import LoginForm from '../components/Login/LoginForm'

const Login = () => {
  const isMobile = useMediaQuery(mobileMaxWidthMediaQuery);

  return (
    <>
      <LoginSignupHeader content="Sign up" />
      {isMobile ? <div className='w-full flex flex-col items-center justify-around'>
        <div className='my-10'>
          <BannerText isMobile={isMobile} />
        </div>
        <div>
          <LoginForm />
        </div>
      </div> : <div className='w-full flex flex-row items-baseline justify-around'>
        <div>
          <AnimatedHighFive isMobile={isMobile} />
          <BannerText isMobile={isMobile} />
        </div>
        <div>
          <LoginForm />
        </div>
      </div>}
    </>
  )
}

export default Login 
