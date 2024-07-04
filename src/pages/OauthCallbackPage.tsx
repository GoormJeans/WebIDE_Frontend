import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OAuthCallbackPage = () => {
  const dispatch = useDispatch();
  const navi = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      // URL에서 토큰 추출
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        localStorage.setItem('AccessToken', token);
        navi('/main')
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
