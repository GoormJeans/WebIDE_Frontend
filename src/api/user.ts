import { createSlice } from '@reduxjs/toolkit';

export interface UserInfo {
  nicknameValue: string;
  cityValue: string;
  emailValue: string;
  passwordValue: string;
  confirmPasswordValue: string;
  bioValue: string;
  imageURLValue: string;
  isAdminValue: boolean;
  social_idValue: string;
}

const initialState: UserInfo = {
  nicknameValue: '',
  cityValue: '',
  emailValue: '',
  passwordValue: '',
  confirmPasswordValue: '',
  bioValue: '',
  imageURLValue: '',
  isAdminValue: false,
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
    // 로그아웃 시
    logoutSuccess: (state, action) => {
      state.nicknameValue = '';
      state.cityValue = '';
      state.emailValue = '';
      state.bioValue = '';
      state.isAdminValue = false;
    },
    // 회원가입 시
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
    setImageURLValue: (state, action) => {
      state.imageURLValue = action.payload;
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
  setImageURLValue,
} = userSlice.actions;

export default userSlice.reducer;