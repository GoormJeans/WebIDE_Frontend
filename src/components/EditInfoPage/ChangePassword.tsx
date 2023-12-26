import React, { ChangeEvent, useState } from 'react'
import InfoEditInputTag from './InfoEditInputTag'
import axios from 'axios';

export const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModified, setIsModified] = useState(false);

  const isPasswordValid: boolean = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(password);
  const isConfirmPasswordValid: boolean = password === confirmPassword;
  const isButtonDisabled: boolean = !isModified || !isPasswordValid || !isConfirmPasswordValid;

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsModified(!!newConfirmPassword);
  };

  const handleChangePassword = async () => {
    try {
      const accessToken = localStorage.getItem('AccessToken');
      const response = await axios.post(`http://goojeans-webide-docker.ap-northeast-2.elasticbeanstalk.com/mypage/edit/password`, {
        password: password,
      },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
          },
        });
      setIsModified(false);
      console.log(response.data.data[0].message);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  }
  return (
    <div className='mx-5 my-5 px-5 py-5 rounded-3xl bg-nav-color shadow-xl'>
      <span className=" text-3xl">Change Password</span>
      <InfoEditInputTag inputType={{
        type: 'password',
        placeholder: 'Enter Password',
        label: 'password'
      }} value={password} onChange={handlePasswordChange} isErrored={!!password && !isPasswordValid} />
      {!isPasswordValid && password && <p className="flex  text-rose-500 justify-center">Invalid password format</p>}
      <InfoEditInputTag inputType={{
        type: 'password',
        placeholder: 'Confirm Password',
        label: 'password again'
      }} value={confirmPassword} onChange={handleConfirmPasswordChange} isErrored={!isConfirmPasswordValid} />
      {!isConfirmPasswordValid && confirmPassword && <p className="flex  text-rose-500 justify-center">Passwords do not match</p>}
      <div className='flex items-center justify-center'>
        <button className=" bg-second-color px-5 py-3 mt-5 w-96 rounded-lg shadow-xl hover:opacity-75 disabled:opacity-50"
          disabled={isButtonDisabled} onClick={handleChangePassword}>Change Password
        </button>
      </div>
    </div>
  )
}

