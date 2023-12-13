import React from 'react'
import LoginSignupHeader from '../components/LoginSignupHeader'
import {AnimatedHighFive} from '../components/AnimatedHand'
import { useMediaQuery } from '@mui/material'
import { mobileMaxWidthMediaQuery } from '../utils/mediaQueries'
import BannerText from '../components/Login/BannerTextLogin'
import LoginForm from '../components/Login/LoginForm'
import FadeIn from '../components/FadeIn'

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
        <FadeIn index={0}>
          <div className='ml-10'>
            <AnimatedHighFive isMobile={isMobile} />
            <BannerText isMobile={isMobile} />
          </div>
        </FadeIn>
        <div className='mr-10'>
          <FadeIn index={1}>
            <div>
              <LoginForm />
            </div>
          </FadeIn>
        </div>
      </div>}
    </>
  )
}

export default Login 
