import ProfileInfo from '../components/Mypage/ProfileInfo';
import { CategoryBtn } from '../components/Mypage/ProbsSelect';
import Achievement from '../components/Mypage/Achievement';
import { useNavigate } from 'react-router-dom';
import React from 'react';
const MyPage = () => {
  const navi = useNavigate();
  return (
    <>
        <div className="mx-5 my-5 px-5 py-5 rounded-3xl bg-nav-color shadow-xl">
            <button onClick={() => navi("edit")} className=' text-xs font-thin rounded-lg px-4 py-1.5 mr-3 bg-white bg-opacity-40 hover:opacity-75 active:opacity-25'>
              edit profile
            </button>
            <div className='flex justify-center items-center'>
              <ProfileInfo />
              <Achievement />
            </div>
        </div>
      <div className='problems-card w-full h-auto' >
        <div className="px-5 w-auto h-full mx-5 mt-5 rounded-3xl bg-nav-color shadow-xl">
          <CategoryBtn />
        </div>
      </div>
    </>

  )
}

export default MyPage;
