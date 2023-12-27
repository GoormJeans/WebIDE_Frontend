import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const token = localStorage.getItem('AccessToken');
    return !!token;
  }

  useEffect(() => {
    const currentPath = window.location.pathname;
    const isExceptionPath = currentPath === '/sign-up' || currentPath === '/oauth/callback' || currentPath === '/oauth/sign-up' || currentPath === '/login';

    if (!isLoggedIn() && !isExceptionPath) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
}

export default PrivateRoute;
