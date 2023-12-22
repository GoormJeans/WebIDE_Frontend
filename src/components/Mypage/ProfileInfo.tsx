import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AppDispatch, RootState } from "../../api/store";
import { setEmailValue, setNicknameValue, setAddressValue, setBioValue, setImageURLValue } from "../../api/user";

const HEAD_CSS = 'pr-3 text-2xl font-medium'
const BUNDLE_CSS = 'mt-3'
        
interface InfoCardProps {
  head: string;
  body: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ head, body }) => {
  const isUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(body);
  return (
    <div className={BUNDLE_CSS}>
      <span className={HEAD_CSS}>{head}</span>
      {head === 'Bio.' ? (
        isUrl ? (
          <Link to={body} target='_blank' className="underline" rel="noreferrer">
            <span>{body}</span>
          </Link>
        ) : (
          <span>{body}</span>
        )
      ) : (
        <span>{body}</span>
      )}
    </div>
  );
}

const ProfileInfo = () => {

  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/api/user-info`);
        console.log('User information:', response.data);
        dispatch(setEmailValue(response.data.email));
        dispatch(setNicknameValue(response.data.nickname));
        dispatch(setAddressValue(response.data.city));
        dispatch(setBioValue(response.data.bio));
        dispatch(setImageURLValue(response.data.imgURL));
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [dispatch]);
  console.log(userInfo);
  return (
    <div className='profile-info flex flex-row'>
      <div className='flex flex-row'>
        <img className='bg-white w-36 h-36 rounded-full ml-10 mr-10 mt-5' src={userInfo.imageURLValue} alt='fake-avartar' />
        <div className='mr-28'>
          <InfoCard head="Email." body={userInfo.emailValue} />
          <InfoCard head="Nickname." body={userInfo.nicknameValue} />
          <InfoCard head="Add." body={userInfo.cityValue} />
          <InfoCard head="Bio." body={userInfo.bioValue} />
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
