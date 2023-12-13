import ProfileInfo from '../components/Mypage/ProfileInfo';
import { CategoryBtn } from '../components/Mypage/ProbsSelect';
import Achievement from '../components/Mypage/Achievement';
import { useNavigate } from 'react-router-dom';
const MyPage = () => {
  const navi = useNavigate();
  return (
    <>
      <div className='profile-card w-full h-80 z-1' >
        <div className="px-5 w-auto h-full flex  mx-5 mt-5 rounded-3xl bg-nav-color shadow-xl	">
          <div className='bg-transparent w-full'>
            <button onClick={() => navi("edit")} className='font-k2d text-xs font-thin rounded-lg px-4 py-1.5 mr-3 mt-5 bg-white bg-opacity-40 hover:opacity-75'>
              edit profile
            </button>
            <div className='w-full bg-transparent flex justify-center'>
              <ProfileInfo />
              <Achievement />
            </div>
          </div>
        </div>
      </div>
      <div className='problems-card w-full h-96 z-1 shadow-xl' >
        <div className="px-5 w-auto h-full mx-5 mt-5 rounded-3xl bg-nav-color shadow-xl">
          <CategoryBtn />
        </div>
      </div>
    </>

  )
}

export default MyPage
