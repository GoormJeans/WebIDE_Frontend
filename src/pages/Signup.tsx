import React from 'react'
import LoginSignupHeader from '../components/LoginSignupHeader'
import { useMediaQuery } from '@mui/material'
import { mobileMaxWidthMediaQuery } from '../utils/mediaQueries'
import FadeIn from '../components/FadeIn'
import { AnimatedFistBump } from '../components/AnimatedHand'
import BannerText from '../components/Signup/BannerTextSignup'
import SignupForm from '../components/Signup/SignupForm'

const Signup = () => {
  const isMobile = useMediaQuery(mobileMaxWidthMediaQuery);

  return (
    <>
      <LoginSignupHeader content="Login" />
      <div className='w-full mx-10'>
        <FadeIn index={0}>
          <div className='flex flex-row items-center'>
            <div className='mr-7'>
              <BannerText isMobile={isMobile} />
            </div>
            <AnimatedFistBump isMobile={isMobile} />
          </div>
        </FadeIn>
        <FadeIn index={1}>
          <div className='flex justify-center mt-3'>
            <SignupForm />
          </div>
        </FadeIn>
      </div>
    </>
  )
}

export default Signup
