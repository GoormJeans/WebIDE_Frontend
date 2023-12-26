import KakaoIcon from '../../assets/images/kakao_icon.png'
import GoogleIcon from '../../assets/images/google_icon.png'
import NaverIcon from '../../assets/images/naver_icon.png'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { userLogin } from '../../api/api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navi = useNavigate();
  const location = useLocation();
  const isLoginDisabled: boolean = !email || !password;
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
      const response = await userLogin(email, password);
      console.log(response.data)
      if (response.data.status === 200) {
        const AccessToken = response.data.data[0].message;
        localStorage.setItem('AccessToken', AccessToken);
        console.log('Login success',);
        navi(from);
      } else {
        console.error('Login failed: unexpected status code', response.data.error);
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
        className=" bg-nav-color px-5 py-3 mx-2 w-72 rounded-xl shadow-xl active:bg-slate-500 disabled:bg-slate-400"
        onClick={handleLogin}
        disabled={isLoginDisabled}
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