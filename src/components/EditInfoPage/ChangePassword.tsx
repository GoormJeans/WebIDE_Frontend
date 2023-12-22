import React, { ChangeEvent } from 'react'
import InfoEditInputTag from './InfoEditInputTag'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../api/store';
import { setPasswordValue, setConfirmPasswordValue } from '../../api/user';

export const ChangePassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const isPasswordValid: boolean = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(user.passwordValue);
  const isConfirmPasswordValid: boolean = user.passwordValue === user.confirmPasswordValue;
  const isButtonDisabled: boolean = !isPasswordValid || !isConfirmPasswordValid;

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPasswordValue(e.target.value));
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setConfirmPasswordValue(e.target.value));
  };
  return (
    <div className='mx-5 my-5 px-5 py-5 rounded-3xl bg-nav-color shadow-xl'>
      <span className=" text-3xl">Change Password</span>
      <InfoEditInputTag inputType={{
        type: 'password',
        placeholder: 'Enter Password',
        label: 'password'
      }} value={user.passwordValue} onChange={handlePasswordChange} isErrored={!!user.passwordValue && !isPasswordValid} />
      {!isPasswordValid && user.passwordValue && <p className="flex  text-rose-500 justify-center">Invalid password format</p>}
      <InfoEditInputTag inputType={{
        type: 'password',
        placeholder: 'Confirm Password',
        label: 'password again'
      }} value={user.confirmPasswordValue} onChange={handleConfirmPasswordChange} isErrored={!isConfirmPasswordValid} />
      {!isConfirmPasswordValid && user.confirmPasswordValue && <p className="flex  text-rose-500 justify-center">Passwords do not match</p>}
      <div className='flex items-center justify-center'>
        <button className=" bg-second-color px-5 py-3 mt-5 w-96 rounded-lg shadow-xl hover:opacity-75"
          disabled={!isButtonDisabled}>Change Password
        </button>
      </div>
    </div>
  )
}

