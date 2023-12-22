import React, { ChangeEvent, useState } from 'react'
import FadeIn from '../FadeIn'
import SignUpInputTag from './SignUpInputTag';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../api/store";
import { setEmailValue, setPasswordValue, setConfirmPasswordValue, setNicknameValue, setAddressValue, setBioValue } from '../../api/user';



const SignupForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const isEmailValid: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.emailValue);
  const isNicknameValid: boolean = user.nicknameValue.length <= 12;
  const isPasswordValid: boolean = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(user.passwordValue);
  const isConfirmPasswordValid: boolean = user.passwordValue === user.confirmPasswordValue;

  const isButtonDisabled: boolean = !agreementChecked || !isEmailValid || !isNicknameValid || !isPasswordValid || !isConfirmPasswordValid;


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmailValue(e.target.value));
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNicknameValue(e.target.value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPasswordValue(e.target.value));
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setConfirmPasswordValue(e.target.value));
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddressValue(e.target.value));
  };

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBioValue(e.target.value));
  };

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  return (
    <div className='flex flex-col'>
      <FadeIn index={0}>
        <div className='flex flex-col'>
          <SignUpInputTag
            inputType={{
              type: 'email',
              placeholder: 'kimgoorm@example.com',
              label: 'Email*',
            }}
            value={user.emailValue}
            onChange={handleEmailChange}
            isErrored={!isEmailValid && !!user.emailValue}
          />
          {!isEmailValid && user.emailValue && <p className=" text-rose-500">Invalid email format</p>}
          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'kim goorm',
              label: 'Nickname* ',
            }}
            value={user.nicknameValue}
            onChange={handleNicknameChange}
            isErrored={!isNicknameValid && !!user.nicknameValue}
          />
          {!isNicknameValid && user.nicknameValue && <p className=" text-rose-500">Nickname must be 12 characters or less</p>}
          <SignUpInputTag
            inputType={{
              type: 'password',
              placeholder: 'Enter passwords',
              label: 'Password* ',
            }}
            value={user.passwordValue}
            onChange={handlePasswordChange}
            isErrored={!isPasswordValid && !!user.passwordValue}
          />
          {!isPasswordValid && user.passwordValue && <p className=" text-rose-500">Invalid password format</p>}
          <SignUpInputTag
            inputType={{
              type: 'password',
              placeholder: 'Confirm passwords',
              label: 'Confirm Password*',
            }}
            value={user.confirmPasswordValue}
            onChange={handleConfirmPasswordChange}
            isErrored={!isConfirmPasswordValid && !!user.confirmPasswordValue}
          />
          {!isConfirmPasswordValid && user.confirmPasswordValue && <p className=" text-rose-500">Passwords do not match</p>}
          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'Enter address',
              label: 'Address',
            }}
            value={user.cityValue}
            onChange={handleAddressChange}
            isErrored={false}
          />

          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'Enter bio',
              label: 'Bio',
            }}
            value={user.bioValue}
            onChange={handleBioChange}
            isErrored={false}
          />
        </div>
      </FadeIn>
      <FadeIn index={2}>
        <div className='flex flex-col items-center'>
          <div className='flex flex-row mt-10'>
            <input type="checkbox" id="agreement" name="agreement" value="agreement" onChange={() => setAgreementChecked(!agreementChecked)} />
            <label className=' text-lg ml-3' htmlFor="agreement">[필수] 개인정보 사용에 동의합니다</label>
            <button
              className=' text-lg ml-3'
              onClick={toggleDetails}
            >
              {detailsVisible ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          {detailsVisible && (
              <p>Details about personal information agreement...</p>
          )}
          <button disabled={isButtonDisabled} className={` ${isButtonDisabled ? 'disabled:bg-slate-400' : 'bg-nav-color'} px-5 py-3 ml-3 mt-3 w-80 rounded-xl shadow-xl`} >Go to register!</button>
        </div>
      </FadeIn>
    </div>
  )
}

export default SignupForm
