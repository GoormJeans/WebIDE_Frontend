import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isLoggedIn = () => {
    const token = localStorage.getItem('AccessToken');
    return !!token;
  }
const isAdmin = () => {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin === "ADMIN";
}
  useEffect(() => {

    if (!isLoggedIn()) {
      navigate('/login');
    }
    else if (!isAdmin()) {
      navigate('/main');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, user.isAdminValue]);

  return children;
}

export default AdminRoute;
