import React, { useState } from 'react'
import FadeIn from '../FadeIn'
import SignUpInputTag from './SignUpInputTag';
import axios from 'axios';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [city, setcity] = useState('');
  const [blog, setBlog] = useState('');
  const [terms, setTerms] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const isEmailValid: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNicknameValid: boolean = nickname.length <= 12;
  const isPasswordValid: boolean = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(password);
  const isConfirmPasswordValid: boolean = password === confirmPassword;
  const isButtonDisabled: boolean = !terms || !isEmailValid || !isNicknameValid || !isPasswordValid || !isConfirmPasswordValid;


  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`https://goojeans-webide-docker.ap-northeast-2.elasticbeanstalk.com/sign-up`, { email, password, nickname, blog, city, terms });
      console.log(response);
      if (response.data.status === 200) {
        console.log(response.data.data[0].message);
      } else {
        console.error(`Sign up failed[${response.data.statusCode}]: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <FadeIn index={0}>
        <div className='flex flex-col'>
          <SignUpInputTag
            inputType={{
              type: 'email',
              placeholder: 'kimgoorm@example.com',
              label: 'Email*',
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isErrored={!isEmailValid && !!email}
          />
          {!isEmailValid && email && <p className=" text-rose-500">Invalid email format</p>}
          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'kim goorm',
              label: 'Nickname* ',
            }}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            isErrored={!isNicknameValid && !!nickname}
          />
          {!isNicknameValid && nickname && <p className=" text-rose-500">Nickname must be 12 characters or less</p>}
          <SignUpInputTag
            inputType={{
              type: 'password',
              placeholder: 'Enter passwords',
              label: 'Password* ',
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isErrored={!isPasswordValid && !!password}
          />
          {!isPasswordValid && password && <p className=" text-rose-500">Invalid password format</p>}
          <SignUpInputTag
            inputType={{
              type: 'password',
              placeholder: 'Confirm passwords',
              label: 'Confirm Password*',
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isErrored={!isConfirmPasswordValid && !!confirmPassword}
          />
          {!isConfirmPasswordValid && confirmPassword && <p className=" text-rose-500">Passwords do not match</p>}
          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'Enter address',
              label: 'Address',
            }}
            value={city}
            onChange={(e) => setcity(e.target.value)}
            isErrored={false}
          />

          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'Enter bio',
              label: 'Bio',
            }}
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            isErrored={false}
          />
        </div>
      </FadeIn>
      <FadeIn index={2}>
        <div className='flex flex-col items-center'>
          <div className='flex flex-row mt-10'>
            <input type="checkbox" id="agreement" name="agreement" value="agreement" onChange={() => setTerms(!terms)} />
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
          <button disabled={isButtonDisabled} className={` ${isButtonDisabled ? 'disabled:bg-slate-400' : 'bg-nav-color'} px-5 py-3 ml-3 mt-3 w-80 rounded-xl shadow-xl`} onClick={handleRegister}>Go to register!</button>
        </div>
      </FadeIn>
    </div>
  )
}

export default SignupForm
