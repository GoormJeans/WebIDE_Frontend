import React, { ChangeEvent, useState } from 'react'
import FadeIn from '../FadeIn'
import SignUpInputTag from './SignUpInputTag';


const SignupForm = () => {
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [bioValue, setBioValue] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordValue(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value);
  };

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBioValue(e.target.value);
  };

  return (
    <div className='flex flex-col'>
      <FadeIn index={0}>
        <div className='flex flex-col'>
          <SignUpInputTag
            inputType={{
              type: 'email',
              placeholder: 'kimgoorm@example.com',
              label: 'email',
            }}
            value={emailValue}
            onChange={handleEmailChange}
          />
          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'kim goorm',
              label: 'nickname',
            }}
            value={nicknameValue}
            onChange={handleNicknameChange}
          />
          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'Enter password',
              label: 'Password',
            }}
            value={passwordValue}
            onChange={handlePasswordChange}  
          />

          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'Confirm password',
              label: 'Confirm Password',
            }}
            value={confirmPasswordValue}
            onChange={handleConfirmPasswordChange}  
          />

          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'Enter address',
              label: 'Address',
            }}
            value={addressValue}
            onChange={handleAddressChange} 
          />

          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'Enter bio',
              label: 'Bio',
            }}
            value={bioValue}
            onChange={handleBioChange}  
          />
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
