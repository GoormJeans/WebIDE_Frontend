import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setEmailValue, setNicknameValue, } from '../api/user'; // Redux 액션
import { useNavigate } from 'react-router-dom';

const OAuthCallbackPage = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();
  const fetchUserInfo = async (token: string) => {
    try {
      const response = await axios.get(`https://eb.goojeans-server.com/oauth/sign-up?token=${token}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("response : ", response);
      if (response.status === 200) {
        return response.data.data[0]; // 이메일과 닉네임이 포함된 사용자 정보
      }
      else {
        throw new Error('Invalid response status');
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      // URL에서 토큰 추출
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      let userInfo = null

      if (token) {
        localStorage.setItem('AccessToken', token);
        userInfo = await fetchUserInfo(token);
        console.log("userInfo : ", userInfo);
        dispatch(setEmailValue(userInfo.email));
        dispatch(setNicknameValue(userInfo.nickname));
        navi('/oauth/sign-up')
      }
    };
    handleOAuthRedirect();
  }, [navi, dispatch]);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      Loading...
    </div>
  );
};

export default OAuthCallbackPage;