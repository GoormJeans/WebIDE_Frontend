import React, { ChangeEvent, useEffect, useState } from 'react'
import InfoEditInputTag from './InfoEditInputTag'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../api/store';
import { setEmailValue, setNicknameValue, setAddressValue, setBioValue } from '../../api/user';
import axios from 'axios';

export const EditMyInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = localStorage.getItem('AccessToken');
        const response = await axios.post(`https://goojeans-webide-docker.ap-northeast-2.elasticbeanstalk.com/api/userInfo`, {},{
          headers: {
            'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
          },
        });
        dispatch(setEmailValue(response.data.data[0].email));
        dispatch(setNicknameValue(response.data.data[0].nickname));
        dispatch(setAddressValue(response.data.data[0].city));
        dispatch(setBioValue(response.data.data[0].bio));
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    fetchUserInfo();
  }, [dispatch]);

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddressValue(e.target.value));
    setIsModified(true);
  };

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBioValue(e.target.value));
    setIsModified(true);
  };

  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem('AccessToken');
      if (isModified) {
        const response = await axios.post(`https://goojeans-webide-docker.ap-northeast-2.elasticbeanstalk.com/mypage/edit/blogAndcity?blog=${user.bioValue}&city=${user.cityValue}`, {
          blog: user.bioValue,
          city: user.cityValue,
        },
          {
            headers: {
            'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
          },
          });
        const updatedUserInfo = response.data.data[0];
        dispatch(setAddressValue(updatedUserInfo.address));
        dispatch(setBioValue(updatedUserInfo.blog));
        setIsModified(false);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <div className='mx-5 my-5 px-5 py-5 rounded-3xl bg-nav-color shadow-xl'>
      <span className=" text-3xl">Edit My info</span>
      <InfoEditInputTag inputType={{
        type: 'email',
        placeholder: '',
        label: 'email'
      }} defaultValue={user.emailValue} value={user.emailValue} onChange={() => { }} isErrored={false} />
      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: '',
        label: 'nickname',
      }} defaultValue={user.nicknameValue} value={user.nicknameValue} onChange={() => { }} isErrored={false} />

      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'Enter your address',
        label: 'address'
      }} defaultValue={user.cityValue} value={user.cityValue} onChange={handleAddressChange} isErrored={false} />

      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'I am a developer',
        label: 'bio'
      }} defaultValue={user.bioValue} value={user.bioValue} onChange={handleBioChange} isErrored={false} />
      <div className='flex items-center justify-center'>
        <button className={` bg-second-color px-5 py-3 mt-5 w-96 rounded-lg shadow-xl hover:opacity-75 disabled:opacity-50`} onClick={handleSave}
          disabled={!isModified}
        >Save
        </button>
      </div>
    </div>
  )
}

