import React, { useEffect } from 'react';
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import MainPage from "./pages/MainPage";
import DetailPage from './pages/DetailPage';
import MyPage from "./pages/MyPage";
import AdminPage from "./pages/AdminPage";
import AdminNav from "./components/AdminPage/AdminNav";
import AdminAlgoPage from "./pages/AdminAlgoPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AddAlgoPage from './pages/AddAlgoPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditCode from './pages/EditCode';
import EditUserInfo from './pages/EditUserInfo';
import { AppDispatch } from './api/store';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './api/auth';
import { withAuth } from './components/WithAuth';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const ClickEvent = () => {
    const target: any = document.querySelector('#fileTreeRight');
    if (target !== null) {
      while (target.firstChild)
        target.removeChild(target.firstChild);
    }
  }
  const Layout = () => {
    return (
      <div>
        <Nav />
        <Outlet />
      </div>
    )
  }

  const AdminLayout = () => {
    return (
      <div>
        <AdminNav />
        <Outlet />
      </div>
    )
  }
  window.addEventListener("click", ClickEvent);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      dispatch(loginSuccess(JSON.parse(isLoggedIn)));
    }
  }, [dispatch]);


  const AuthenticatedMainPage = withAuth(MainPage);
  const AuthenticatedMyPage = withAuth(MyPage);
  const AuthenticatedEditUserInfoPage = withAuth(EditUserInfo);
  const AuthenticatedAdminPage = withAuth(AdminPage);
  const AuthenticatedAdminAlgoPage = withAuth(AdminAlgoPage);
  const AuthenticatedAdminUsersPage = withAuth(AdminUsersPage);
  const AuthenticatedAddAlgoPage = withAuth(AddAlgoPage);
  const AuthenticatedEditCodePage = withAuth(EditCode);

  return (
    <div className='App'>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AuthenticatedMainPage />} />
          <Route path="algorithms" element={<DetailPage />} />
          <Route path="mypage" element={<AuthenticatedMyPage />} />
          <Route path="mypage/edit" element={<AuthenticatedEditUserInfoPage />} />
          <Route path="detail" element={<DetailPage />} />
          <Route path="settings" element={<DetailPage />} />

          <Route path="admin" element={<AdminLayout />} >
            <Route index element={<AuthenticatedAdminPage />} />
            <Route path="algorithm" element={<AuthenticatedAdminAlgoPage />} />
            <Route path="user" element={<AuthenticatedAdminUsersPage />} />
            <Route path="algorithm/:id" element={<AuthenticatedAddAlgoPage />} />
          </Route>
          <Route path="Search" element={<AuthenticatedMainPage />} />
        </Route>
        <Route path="/editor" element={<AuthenticatedEditCodePage />} />
        <Route path=":id" element={<AuthenticatedEditCodePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>

    </div>
  );
}

export default App;