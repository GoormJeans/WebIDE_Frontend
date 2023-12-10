import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../api/store';

const IMG_URL = 'https://s3-alpha-sig.figma.com/img/3c8d/1c0e/302cb16330f866e30689725dbb18c9dd?Expires=1702857600&Signature=YPUJXfciv9r46ucj23mbpBPXzbP2nN1jXRz0Vpbdn3LGznA9uSPEhunAlroYuxol3wcamyYYg80ft7ZHVDnnzRzR1uc-sl47Gw5V7y1tIr-nGMGIrbpk0UYbWTkJMJdLY0pH2XBhlLGGM8H~MOaqZVEw2MNua4JiEuwAMqmiW2Tud8pieTXzx8Iua~Z73qJgNtBERgnwmu0QBNWP0XBZo4I6hgBiGrLk9rLJS6UB3OdwJ~r2o9QUi9y4lND-Pspv7HSIch0jJYpX9UUatlWXPltbbO76857bw2CqzDbMonyVeukCcGHKvrl9u0U5V8rop7gbR4j4-QDSNCpZHlfOQQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'

const MyPage = () => {
  const dispatch = useDispatch();
  // const selectedButton = useSelector(state => state.selectedButton);

  const handleButtonClick = (buttonType: string) => {
    dispatch({ type: 'SELECT_BUTTON', payload: buttonType });
  };

  return (
    <>
      <div className='w-full h-64 z-1' >
        <div className="px-5 w-auto h-full flex justify-between items-center bg-nav-color mx-5 mt-5 rounded-3xl shadow-xl	">
          <div className='profile-card bg-transparent'>
            <button className='font-k2d text-xs font-thin rounded-lg px-4 py-1.5 mr-3 mb-5 bg-white bg-opacity-40 hover:opacity-75'>
              edit profile
            </button>
            <div className='bg-transparent flex flex-row'>
              <div className='profile-info bg-transparent flex flex-row'>
                <img className='fake-avartar bg-white w-36 h-36 rounded-full ml-7 mr-10' src={IMG_URL} alt='fake-avartar' />
                <div className='profile-info-text bg-transparent mr-10'>
                  <div className='profile-info-text-name bg-transparent font-k2d'>
                    <span className='name-header bg-transparent pr-3 text-2xl font-medium'>Name.</span>
                    <span className='name-text bg-transparent'>kim goorm</span>
                  </div>
                  <div className='profile-info-text-tell bg-transparent font-k2d'>
                    <span className='name-header bg-transparent pr-3 text-2xl font-medium'>Tell.</span>
                    <span className='tell-text bg-transparent'>010-1234-5678</span>
                  </div>
                  <div className='profile-info-text-address bg-transparent font-k2d'>
                    <span className='name-header bg-transparent pr-3 text-2xl font-medium'>Add.</span>
                    <span className='address-text bg-transparent'>Seoul, Korea</span>
                  </div>
                  <div className='profile-info-text-email bg-transparent font-k2d'>
                    <span className='name-header bg-transparent pr-3 text-2xl font-medium'>Email.</span>
                    <span className='email-text bg-transparent'>kimgoorm@gmail.com</span>
                  </div>
                  <div className='profile-info-text-bio bg-transparent font-k2d'>
                    <span className='name-header bg-transparent pr-3 text-2xl font-medium'>Bio.</span>
                    <span className='bio-text bg-transparent'>https://github.com/kimgoorm</span>
                  </div>
                </div>
              </div>
              <div className='circle-chart bg-transparent'>
                circle-chart
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-96 z-1' >
        <div className="px-5 w-auto h-full mx-5 mt-5 rounded-3xl shadow-xl	bg-nav-color">
          <button
            // className={`rounded-full px-4 py-2 ${selectedButton === 'solved' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            className={`font-k2d text-sm font-semibold rounded-full px-6 py-2 mr-3 mt-5  bg-gray-300 hover:opacity-75`}
            onClick={() => handleButtonClick('solved')}
          >
            Solved
          </button>
          <button
            // className={`rounded-full px-4 py-2 ${selectedButton === 'tried' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            className={`font-k2d text-sm font-semibold rounded-full px-7 py-2 mr-3 mt-5 bg-gray-300 hover:opacity-75`}
            onClick={() => handleButtonClick('tried')}
          >
            Tried
          </button>
          <button
            // className={`rounded-full px-4 py-2 ${selectedButton === 'saved' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            className={`font-k2d text-sm font-semibold rounded-full px-6 py-2 mr-3 mt-5 bg-gray-300 hover:opacity-75`}

            onClick={() => handleButtonClick('saved')}
          >
            Saved
          </button>
        </div>
      </div>
    </>

  )
}

export default MyPage
