import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from "../types/UserInfo.type";


const initialState: UserInfo = {
  nicknameValue: '',
  cityValue: '',
  emailValue: '',
  passwordValue: '',
  confirmPasswordValue: '',
  bioValue: '',
  isAdminValue: '',
  social_idValue: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 로그인 성공 시
    loginSuccess: (state, action) => {
      const { nickname, city, email, bio, isAdmin } =
        action.payload;
      state.nicknameValue = nickname;
      state.cityValue = city;
      state.emailValue = email;
      state.bioValue = bio;
      state.isAdminValue = isAdmin;
    },
    
    logoutSuccess: (state, action) => {
      state.nicknameValue = '';
      state.cityValue = '';
      state.emailValue = '';
      state.bioValue = '';
      state.isAdminValue = '';
    },
    
    setEmailValue: (state, action) => {
      state.emailValue = action.payload;
    },
    setPasswordValue: (state, action) => {
      state.passwordValue = action.payload;
    },
    setConfirmPasswordValue: (state, action) => {
      state.confirmPasswordValue = action.payload;
    },
    setNicknameValue: (state, action) => {
      state.nicknameValue = action.payload;
    },
    setAddressValue: (state, action) => {
      state.cityValue = action.payload;
    },
    setBioValue: (state, action) => {
      state.bioValue = action.payload;
    },
    setIsAdminValue: (state, action) => {
      state.isAdminValue = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  setEmailValue,
  setPasswordValue,
  setConfirmPasswordValue,
  setNicknameValue,
  setAddressValue,
  setBioValue,
  setIsAdminValue,
} = userSlice.actions;

export default userSlice.reducer;