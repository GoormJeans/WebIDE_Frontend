import React, { useState } from 'react'
import FadeIn from '../FadeIn'


const SignupForm = () => {
  const [agreementChecked, setAgreementChecked] = useState(false);

  return (
    <div className='flex flex-col'>
      <FadeIn index={0}>
        <div className='flex flex-col'>
          <span className="font-k2d text-lg mt-3">email</span>
          <input className="font-k2d bg-slate-300 px-5 py-3 w-72 rounded-xl shadow-xl" type="email" placeholder="kimgoorm@example.com" />

          <span className="font-k2d text-lg mt-3">password</span>
          <input className="font-k2d bg-slate-300 px-5 py-3 w-96 rounded-xl shadow-xl" type="password" placeholder="Contains 8 or more characters, special characters, and numbers" />

          <span className="font-k2d text-lg mt-3">password again</span>
          <div className='flex flex-row'>
            <input className="font-k2d bg-slate-300 px-5 py-3 w-96 rounded-xl shadow-xl" type="password" placeholder="Contains 8 or more characters, special characters, and numbers" />
            <button className='font-k2d bg-nav-color px-5 py-3 ml-3 w-24 rounded-xl shadow-xl active:bg-slate-500'>check</button>
          </div>
          <span className="font-k2d text-lg mt-3">nickname</span>
          <input className="font-k2d bg-slate-300 px-5 py-3 w-96 rounded-xl shadow-xl" type="text" placeholder="kimgoorm" />

          <span className="font-k2d text-lg mt-3">address</span>
          <input className="font-k2d bg-slate-300 px-5 py-3 w-96 rounded-xl shadow-xl" type="text" placeholder="Seoul, Korea" />

          <span className="font-k2d text-lg mt-3">bio</span>
          <input className="font-k2d bg-slate-300 px-5 py-3 w-96 rounded-xl shadow-xl" type="text" placeholder='Hello, World!' />
        </div>
      </FadeIn>
      <FadeIn index={2}>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-row mt-10'>
              <input type="checkbox" id="agreement" name="agreement" value="agreement" onChange={() => setAgreementChecked(!agreementChecked)} />
              <label className='font-k2d text-lg ml-3' htmlFor="agreement">[필수] 개인정보 사용에 동의합니다</label>
            </div>
            <button disabled={!agreementChecked} className='font-k2d disabled:bg-slate-400  active:bg-slate-500 bg-nav-color px-5 py-3 ml-3 mt-3 w-80 rounded-xl shadow-xl' >Go to register!</button>
        </div>
      </FadeIn>
    </div>
  )
}

export default SignupForm
