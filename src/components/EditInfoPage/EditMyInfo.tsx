import React, { ChangeEvent } from 'react'
import InfoEditInputTag from './InfoEditInputTag'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../api/store';
import { setAddressValue, setBioValue } from '../../api/user';
import { user1 } from '../../types/DummyData';

export const EditMyInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddressValue(e.target.value));
  };

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBioValue(e.target.value));
  };

  return (
    <div className='mx-5 my-5 px-5 py-5 rounded-3xl bg-nav-color shadow-xl'>
      <span className="font-k2d text-3xl">Edit My info</span>
      <InfoEditInputTag inputType={{
        type: 'email',
        placeholder: '',
        label: 'email'
      }} defaultValue={user1.email} onChange={() => { }} isErrored={false} />
      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'kimgoorm',
        label: 'nickname',
      }} defaultValue={user1.nickname} onChange={() => { }} isErrored={false} />

      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'Seoul, Korea',
        label: 'address'
      }} defaultValue={user1.city} onChange={handleAddressChange} isErrored={false} />

      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'I am a developer',
        label: 'bio'
      }} defaultValue={user1.bio} onChange={handleBioChange} isErrored={false} />
      <div className='flex items-center justify-center'>
        <button className="font-k2d bg-second-color px-5 py-3 mt-5 w-96 rounded-lg shadow-xl hover:opacity-75"
        >Save
        </button>
      </div>
    </div>
  )
}

