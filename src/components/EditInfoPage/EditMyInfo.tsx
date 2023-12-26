import React, { ChangeEvent, useEffect, useState } from 'react'
import InfoEditInputTag from './InfoEditInputTag'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../api/store';
import { setEmailValue, setNicknameValue, setAddressValue, setBioValue } from '../../api/user';
import axios from 'axios';

export const EditMyInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/api/user-info`);
        console.log('User information:', response.data);
        dispatch(setEmailValue(response.data.email));
        dispatch(setNicknameValue(response.data.nickname));
        dispatch(setAddressValue(response.data.city));
        dispatch(setBioValue(response.data.bio));
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
      if (isModified) {
        const response = await axios.post('http://localhost:3003/api/update-user-info', {
          city: userInfo.cityValue,
          bio: userInfo.bioValue,
        },
          {
            headers: {
              'email': localStorage.getItem('email'),
            },
          });
        const updatedUserInfo = response.data.data;
        dispatch(setAddressValue(updatedUserInfo.city));
        dispatch(setBioValue(updatedUserInfo.bio));
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
      }} defaultValue={userInfo.emailValue} value={userInfo.emailValue} onChange={() => { }} isErrored={false} />
      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: '',
        label: 'nickname',
      }} defaultValue={userInfo.nicknameValue} value={userInfo.nicknameValue} onChange={() => { }} isErrored={false} />

      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'Enter your address',
        label: 'address'
      }} defaultValue={userInfo.cityValue} value={userInfo.cityValue} onChange={handleAddressChange} isErrored={false} />

      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'I am a developer',
        label: 'bio'
      }} defaultValue={userInfo.bioValue} value={userInfo.bioValue} onChange={handleBioChange} isErrored={false} />
      <div className='flex items-center justify-center'>
        <button className={` bg-second-color px-5 py-3 mt-5 w-96 rounded-lg shadow-xl hover:opacity-75 ${isModified ? '' : 'opacity-50'}`} onClick={handleSave}
          disabled={!isModified}
        >Save
        </button>
      </div>
    </div>
  )
}

