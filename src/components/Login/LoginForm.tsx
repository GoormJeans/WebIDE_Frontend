import KakaoIcon from '../../assets/images/kakao_icon.png'
import GoogleIcon from '../../assets/images/google_icon.png'
import NaverIcon from '../../assets/images/naver_icon.png'
import axios from 'axios';
import{ loginSuccess } from '../../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../api/store';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const navi = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:3003/login`, { email, password });
      const jwt = response.data.data[0].message;
      if (response.data.statusCode === 2000) {
        localStorage.setItem('jwt', jwt);
        dispatch(loginSuccess(response.data));
        localStorage.setItem('isLoggedIn', 'true');
        navi('/');
      } else {
        console.error('Login failed: unexpected status code', response.data.statusCode);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      console.log('Login success:', auth);
    }
  }, [auth]);

  return (
    <div className="flex flex-col items-center">
      <input
        className=" bg-slate-300 px-5 py-3 mx-2 w-72 rounded-xl shadow-xl"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        className=" bg-slate-300 px-5 py-3 mx-2 w-72 rounded-xl shadow-xl"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        className=" bg-nav-color px-5 py-3 mx-2 w-72 rounded-xl shadow-xl active:bg-slate-500"
        onClick={handleLogin}
      >
        Login
      </button>
      <span className=" text-sm text-slate-700 mt-8 mb-5">Or continue with</span>
      <div className="w-full flex flex-row justify-evenly">
        <img src={GoogleIcon} alt="google icon" className="w-10 h-10 mx-2 shadow-2xl" onClick={() => { }} />
        <img src={NaverIcon} alt="naver icon" className="w-10 h-10 mx-2 shadow-2xl" onClick={() => { }} />
        <img src={KakaoIcon} alt="kakao icon" className="w-10 h-10 mx-2 shadow-2xl" onClick={() => { }} />
      </div>
    </div>
  )
}

export default LoginForm
