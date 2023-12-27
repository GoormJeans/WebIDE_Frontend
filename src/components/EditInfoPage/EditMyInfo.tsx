import React, { useEffect, useState } from 'react';
import InfoEditInputTag from './InfoEditInputTag';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../api/store';
import Modal from '../Modal';
import { fetchUserInfo, updateUserInfo } from '../../api/api';
import { setEmailValue, setNicknameValue, setAddressValue, setBioValue, setIsAdminValue } from '../../api/user';
import { useNavigate } from 'react-router-dom';

export const EditMyInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const [editedAddress, setEditedAddress] = useState(user.cityValue);
  const [editedBio, setEditedBio] = useState(user.bioValue);
  const [isModified, setIsModified] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navi = useNavigate();

  const handleSaveClick = async () => {
    try {
      await updateUserInfo(
        {
          bioValue: editedBio,
          cityValue: editedAddress,
        },
        dispatch,
        setEditedAddress,
        setEditedBio
      );
      setModalOpen(true);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = () => {
    setIsModified(true);
  };

  useEffect(() => {
    fetchUserInfo(dispatch, setEmailValue, setNicknameValue, setAddressValue, setBioValue, setIsAdminValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='mx-5 my-5 px-5 py-5 rounded-3xl bg-nav-color shadow-xl'>
      <span className=" text-3xl">Edit My info</span>
      <InfoEditInputTag
        inputType={{
          type: 'email',
          placeholder: '',
          label: 'email',
        }}
        defaultValue={user.emailValue}
        value={user.emailValue}
        onChange={() => { }}
        isErrored={false}
      />
      <InfoEditInputTag
        inputType={{
          type: 'text',
          placeholder: '',
          label: 'nickname',
        }}
        defaultValue={user.nicknameValue}
        value={user.nicknameValue}
        onChange={() => { }}
        isErrored={false}
      />

      <InfoEditInputTag
        inputType={{
          type: 'text',
          placeholder: 'Enter your address',
          label: 'address',
        }}
        defaultValue={editedAddress}
        value={editedAddress}
        onChange={(e) => {
          setEditedAddress(e.target.value);
          handleInputChange();
        }}
        isErrored={false}
      />

      <InfoEditInputTag
        inputType={{
          type: 'text',
          placeholder: 'I am a developer',
          label: 'bio',
        }}
        defaultValue={editedBio}
        value={editedBio}
        onChange={(e) => {
          setEditedBio(e.target.value);
          handleInputChange();
        }}
        isErrored={false}
      />
      <div className='flex items-center justify-center'>
        <button
          className={` bg-second-color px-5 py-3 mt-5 w-96 rounded-lg shadow-xl hover:opacity-75 disabled:opacity-50`}
          onClick={handleSaveClick}
          disabled={!isModified}
        >
          Save
        </button>
      </div>
      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <span className='flex text-xl'>수정 완료✅</span>
        <p className='pb-10'>정보 수정이 완료되었습니다.</p>
        <p
          className='flex bg-nav-color rounded-md p-1 justify-center hover:opacity-75 active:opacity-35'
          onClick={() => { handleModalClose(); navi('/mypage'); }}
        >
          닫기
        </p>
      </Modal>
    </div>
  );
};
