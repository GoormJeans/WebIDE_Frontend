import React, { ChangeEvent, useEffect, useState } from 'react'
import InfoEditInputTag from './InfoEditInputTag'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../api/store';
import { setAddressValue, setBioValue } from '../../api/user';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../../api/api';

export const EditMyInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [address, setAddress] = useState(user.cityValue);
  const [bio, setBio] = useState(user.bioValue);
  const [isModified, setIsModified] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const navi = useNavigate();
  
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setIsModified(true);
  };

  const handleBioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
    setIsModified(true);
  };

  const handleSave = async () => {
    dispatch(setAddressValue(address));
    dispatch(setBioValue(bio));
    setIsModified(false);
  };

  useEffect(() => {
    if (isModified) {
      updateUserInfo(user, dispatch, setIsSaveModalOpen, setIsModified);
    }
  }, [isModified, user, dispatch]);

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
      }} defaultValue={address} value={address} onChange={handleAddressChange} isErrored={false} />

      <InfoEditInputTag inputType={{
        type: 'text',
        placeholder: 'I am a developer',
        label: 'bio'
      }} defaultValue={bio} value={bio} onChange={handleBioChange} isErrored={false} />
      <div className='flex items-center justify-center'>
        <button className={` bg-second-color px-5 py-3 mt-5 w-96 rounded-lg shadow-xl hover:opacity-75 disabled:opacity-50`} onClick={handleSave}
          disabled={!isModified}
        >Save
        </button>
      </div>
      <Modal isOpen={isSaveModalOpen} handleClose={() => { setIsSaveModalOpen(false); navi('/mypage') }}>
        <span className='flex text-xl'>수정 완료✅</span>
        <p className='pb-10'>정보 수정이 완료되었습니다.</p>
        <p className='flex bg-nav-color rounded-md p-1 justify-center hover:opacity-75 active:opacity-35' onClick={() => { setIsSaveModalOpen(false); navi('/mypage') }}>닫기</p>
      </Modal>
    </div>
  )
}

