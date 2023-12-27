import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const token = localStorage.getItem('AccessToken');
    return !!token;
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
}

export default PrivateRoute;
