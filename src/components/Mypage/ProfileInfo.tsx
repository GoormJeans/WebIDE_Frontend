import { Link } from "react-router-dom";
import { user2 } from '../../types/DummyData';

const IMG_URL = 'https://url.kr/csn968'

const HEAD_CSS = 'pr-3 text-2xl font-medium'
const BUNDLE_CSS = 'bg-transparent font-k2d mt-3'

interface InfoCardProps {
  head: string;
  body: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ head, body }) => (
  <div className={BUNDLE_CSS}>
    <span className={HEAD_CSS}>{head}</span>
    {head === 'Bio.' ? <Link className="underline" to={body}><span>{body}</span></Link> : <span>{body}</span>}
  </div>
);

const ProfileInfo = () => {
  return (
    <div className='profile-info flex flex-row'>
      <div className='flex flex-row'>
        <img className='bg-white w-36 h-36 rounded-full ml-10 mr-10 mt-5' src={IMG_URL} alt='fake-avartar' />
        <div className='mr-28'>
          <InfoCard head="Nickname." body={user2.nickname} />
          <InfoCard head="Add." body={user2.city} />
          <InfoCard head="Email." body={user2.email} />
          <InfoCard head="Bio." body={user2.bio} />
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
