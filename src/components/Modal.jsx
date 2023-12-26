import React from 'react';

const Modal = ({ isOpen, handleClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="p-6 bg-white rounded-xl shadow-lg max-w-sm w-full z-10">
        <div className=''>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
