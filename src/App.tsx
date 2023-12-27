import React from 'react';
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
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from './privateRoute';
import OAuthCallbackPage from './pages/OauthCallbackPage';
import OauthSignup from './pages/OauthSignupPage';
import AdminRoute from './adminRoute';

function App() {
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

  return (
    <div className='App'>
      <Routes>
        <Route element={<Layout />}>
          <Route path="main" element={<PrivateRoute><MainPage /></PrivateRoute>} />
          <Route path="algorithms" element={<PrivateRoute><DetailPage /></PrivateRoute>} />
          <Route path="mypage" element={<PrivateRoute><MyPage /></PrivateRoute>} />
          <Route path="mypage/edit" element={<PrivateRoute><EditUserInfo /></PrivateRoute>} />
          <Route path="detail" element={<PrivateRoute><DetailPage /></PrivateRoute>} />
          <Route path="settings" element={<PrivateRoute><DetailPage /></PrivateRoute>} />
          <Route path="*" element={<PrivateRoute><NotFoundPage /></PrivateRoute>} />

          <Route path="admin" element={<AdminRoute><AdminLayout /></AdminRoute>} >
            <Route index element={<AdminRoute><AdminPage /></AdminRoute>} />
            <Route path="algorithm" element={<AdminRoute><AdminAlgoPage /></AdminRoute>} />
            <Route path="user" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
            <Route path="algorithm/:id" element={<AdminRoute><AddAlgoPage /></AdminRoute>} />
          </Route>

        </Route>
        <Route path="editor/:id" element={<PrivateRoute><EditCode /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
        <Route path="/oauth/sign-up" element={<OauthSignup />} />
      </Routes>

    </div>
  );
}

export default App;