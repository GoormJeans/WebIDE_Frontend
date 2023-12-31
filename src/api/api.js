import axios from 'axios';

export const fetchProblemsApi = async () => {
  const accessToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`https://eb.goojeans-server.com/algorithm/list`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  console.log(response.data);
  if (response.data.status !== 200) {
    console.error('Error fetching problems:', response.data.error);
    return;
  }
  return response.data.data;
}

export const fetchUserInfo = async (dispatch, setEmailValue, setNicknameValue, setAddressValue, setBioValue, setIsAdminValue) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`https://eb.goojeans-server.com/api/userInfo`, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
      },
    });
    console.log(response.data.data[0])
    localStorage.setItem('nickname', response.data.data[0].nickname);
    dispatch(setEmailValue(response.data.data[0].email));
    dispatch(setNicknameValue(response.data.data[0].nickname));
    dispatch(setAddressValue(response.data.data[0].city));
    dispatch(setBioValue(response.data.data[0].bio));
    dispatch(setIsAdminValue(response.data.data[0].isAdmin ? response.data.data[0].isAdmin : "USER"));
    localStorage.setItem('isAdmin', response.data.data[0].isAdmin);
  } catch (error) {
    console.error('Error fetching user information:', error);
  }
};

export const updateUserInfo = async (user, dispatch, setAddressValue, setBioValue) => {
  try {
    const { bioValue, cityValue } = user;
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`https://eb.goojeans-server.com/mypage/edit/blogAndcity?blog=${user.bioValue}&city=${user.cityValue}`, {
      blog: bioValue,
      city: cityValue,
    },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
        },
      });
    console.log(response.data);
    if (response.data.status === 200) {
      const updatedUserInfo = response.data.data[0];
      dispatch(setAddressValue(updatedUserInfo.address));
      dispatch(setBioValue(updatedUserInfo.blog));
    }
    else {
      console.error('Error updating user information:', response.data.error);
      return;
    }
  } catch (error) {
    console.error('Error updating user information:', error);
  }
};

export const userRegister = async (email, password, nickname, blog, city, terms, setIsSuccessModalOpen, setIsFailModalOpen, setErrorMsg) => {
  try {
    const response = await axios.post(`https://eb.goojeans-server.com/sign-up`, { email, password, nickname, blog, city, terms });
    if (response.data.status === 200) {
      console.log(response.data.data[0].message);
      setIsSuccessModalOpen(true);
    }
    else if (response.data.status === 4001) {
      setErrorMsg('이미 존재하는 이메일입니다.');
      setIsFailModalOpen(true);
    }
    else if (response.data.status === 4011) {
      setErrorMsg('이미 존재하는 닉네임입니다.');
      setIsFailModalOpen(true);
    }
    else if (response.data.status === 4012) {
      setErrorMsg('필요한 정보를 모두 입력해주세요.');
      setIsFailModalOpen(true);
    }
    else {
      console.error(`Sign up failed[${response.data.status}]: ${response.data.error}`);
    }
  } catch (error) {
    console.error('Sign up failed:', error);
  }
};

export const userLogin = async (email, password) => {
  try {
    const response = await axios.post(`https://eb.goojeans-server.com/login`, { email, password });
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const changePassword = async (password) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(
      `https://eb.goojeans-server.com/mypage/edit/password`,
      {
        password: password,
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.status !== 200) {
      console.error(`Change password failed[${response.data.status}]: ${response.data.error}`);
      return null;
    } else {
      return response.data.data[0].message;
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
    return null;
  }
};

export const deleteAccountApi = async () => {
  const accessToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`https://eb.goojeans-server.com/mypage/edit/unsubscribe`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return response;
}


export const OauthSignUpApi = async (user, dispatch, setAddressValue, setBioValue) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`https://eb.goojeans-server.com/sign-up/update?blog=${user.bioValue}&city=${user.cityValue}`, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰을 포함시킵니다.
      },
    });
    if (response.data.status === 200) {
      dispatch(setAddressValue(response.data.data[0].city));
      dispatch(setBioValue(response.data.data[0].bio));
      return response;
    }
    else {
      console.error(`Sign up failed[${response.data.status}]: ${response.data.error}`);
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
  }
};