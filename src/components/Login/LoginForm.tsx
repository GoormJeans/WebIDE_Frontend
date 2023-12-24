import KakaoIcon from '../../assets/images/kakao_icon.png'
import GoogleIcon from '../../assets/images/google_icon.png'
import NaverIcon from '../../assets/images/naver_icon.png'
import axios from 'axios';
import{ loginSuccess } from '../../api/auth';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react'
import { AppDispatch } from '../../api/store';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navi = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } }

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      console.error('Invalid input: email or password is empty.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3003/login`, { email, password });
      if (response.data.statusCode === 2000) {
        const jwt = response.data.data[0].message;
        localStorage.setItem('access-token', jwt);
        localStorage.setItem('email', email);
        dispatch(loginSuccess(response.data));
        navi(from);
      } else {
        console.error('Login failed: unexpected status code', response.data.statusCode);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

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