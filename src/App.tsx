import React from 'react';
import Main from './components/Main';

function App() {
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import MainPage from "./pages/MainPage";
import DetailPage from './pages/DetailPage';
import MyPage from "./pages/MyPage";
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
      <Main />
    </div>
  );
}

export default App;
