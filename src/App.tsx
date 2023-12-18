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

function App() {
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
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="algorithms" element={<DetailPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="mypage/edit" element={<EditUserInfo />} />
          <Route path="detail" element={<DetailPage />} />
          <Route path="settings" element={<DetailPage />} />

          <Route path="admin" element={<AdminLayout />} >
            <Route index element={<AdminPage />} />
            <Route path="algorithm" element={<AdminAlgoPage />} />
            <Route path="user" element={<AdminUsersPage />} />
            <Route path="algorithm/:id" element={<AddAlgoPage />} />
          </Route>
          <Route path="Search" element={<MainPage />} />
        </Route>
        <Route path="/editor" element={<EditCode />} />
        <Route path=":id" element={<EditCode />} />        
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>

    </div>
  );
}

export default App;