import React from 'react';
import Main from './components/Main';
import {Route, Routes } from 'react-router-dom';
import Mypage from './pages/Mypage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/mypage" element={<Mypage />}/>
    </Routes>

  );
}

export default App;
