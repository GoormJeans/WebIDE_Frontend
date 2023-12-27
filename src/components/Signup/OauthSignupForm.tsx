import React, { useState } from 'react'
import FadeIn from '../FadeIn'
import SignUpInputTag from './SignUpInputTag';
import Modal from '../Modal';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../api/store';
import { OauthSignUpApi } from '../../api/api';
import { setAddressValue, setBioValue } from '../../api/user';

const OauthSignupForm = () => {

  const [city, setcity] = useState('');
  const [blog, setBlog] = useState('');
  const [terms, setTerms] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  const isButtonDisabled: boolean = !terms
  const navi = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await OauthSignUpApi(user, dispatch, setAddressValue, setBioValue,);
      console.log("response : ", response);
      if (response?.data.status === 201) {
        setIsSuccessModalOpen(true);
      }
      else {
        console.log("response : ", response?.data.error);
      }
    }
    catch (error) {
      console.error('Error fetching user information:', error);
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
            value={user.emailValue}
            onChange={() => { }}
            isErrored={false}
            disabled={true}
          />
          <SignUpInputTag
            inputType={{
              type: 'text',
              placeholder: 'kim goorm',
              label: 'Nickname* ',
            }}
            value={user.nicknameValue}
            onChange={() => { }}
            isErrored={false}
            disabled={true}
          />
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

          </div>
          <button disabled={isButtonDisabled} className={`bg-nav-color disabled:bg-slate-400 px-5 py-3 ml-3 mt-3 w-80 rounded-xl shadow-xl`} onClick={handleRegister}>Go to register!</button>
        </div>
      </FadeIn>

      <Modal isOpen={isSuccessModalOpen} handleClose={() => { setIsSuccessModalOpen(false); navi('/main') }}>
        <span className='flex text-xl'>회원가입 성공🎉</span>
        <p className='pb-10'>환영합니다!</p>
        <p className='flex bg-nav-color rounded-md p-1 justify-center' onClick={() => setIsFailModalOpen(false)}>메인으로</p>
      </Modal>
      <Modal isOpen={isFailModalOpen} handleClose={() => setIsFailModalOpen(false)}>
        <span className='flex text-xl'>회원가입 오류⚠️</span>
        <p className='pb-10'>예기치 못한 에러가 발생했습니다.</p>
        <p className='flex bg-nav-color rounded-md p-1 justify-center' onClick={() => setIsFailModalOpen(false)}>닫기</p>
      </Modal>
    </div>
  )
}

export default OauthSignupForm
