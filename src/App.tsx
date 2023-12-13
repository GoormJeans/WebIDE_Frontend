import React from 'react';
import Main from './components/Main';
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import MainPage from "./pages/MainPage";
import DetailPage from './pages/DetailPage';
import MyPage from "./pages/MyPage";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main_c from './components/Main_c';

function App() {
  const Layout = () => {
    return (
      <div>
        <Nav />
        <Outlet />
        <Main_c />
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
          <Route path="detail" element={<DetailPage />} />
          <Route path="settings" element={<DetailPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/editor" element={<Main />} />
      </Routes>

    </div>
  );
}

export default App;