import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { deleteAccountApi } from "../../api/api";

export const DeleteAccount = () => {
  const navi = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccountApi();
      console.log(response);
      if (response.data.status !== 200) {
        throw new Error('Invalid response status');
      }
      else {
        localStorage.removeItem('AccessToken');
        console.log('Delete Account success');
        navi('/login');
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  }

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    await handleDeleteAccount();
  };

  return (
    <div className='mx-5 my-5 px-5 py-5 rounded-3xl bg-nav-color shadow-xl'>
      <span className=" text-3xl">Delete Account</span>
      <div className='flex items-center justify-center'>
        <button className=" bg-red-500 px-5 py-3 mt-5 w-96 rounded-lg shadow-xl hover:opacity-75 active:opacity-30" onClick={handleDeleteAccount}>Delete Account
        </button>
      </div>
      <Modal isOpen={isDeleteModalOpen} handleClose={() => setIsDeleteModalOpen(false)}>
        <span className='flex text-xl'>계정 삭제⚠️</span>
        <p className='pb-10'>정말로 계정을 삭제하시겠습니까?</p>
        <p className='flex bg-red-500 rounded-md p-1 justify-center' onClick={handleConfirmDelete}>확인</p>
        <p className='flex bg-slate-600 rounded-md p-1 justify-center' onClick={() => setIsDeleteModalOpen(false)}>취소</p>
      </Modal>
    </div>
  )
}

