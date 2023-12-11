const IMG_URL = 'https://s3-alpha-sig.figma.com/img/3c8d/1c0e/302cb16330f866e30689725dbb18c9dd?Expires=1702857600&Signature=YPUJXfciv9r46ucj23mbpBPXzbP2nN1jXRz0Vpbdn3LGznA9uSPEhunAlroYuxol3wcamyYYg80ft7ZHVDnnzRzR1uc-sl47Gw5V7y1tIr-nGMGIrbpk0UYbWTkJMJdLY0pH2XBhlLGGM8H~MOaqZVEw2MNua4JiEuwAMqmiW2Tud8pieTXzx8Iua~Z73qJgNtBERgnwmu0QBNWP0XBZo4I6hgBiGrLk9rLJS6UB3OdwJ~r2o9QUi9y4lND-Pspv7HSIch0jJYpX9UUatlWXPltbbO76857bw2CqzDbMonyVeukCcGHKvrl9u0U5V8rop7gbR4j4-QDSNCpZHlfOQQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'

const HEAD_CSS = 'bg-transparent pr-3 text-2xl font-medium'
const BODY_CSS = 'bg-transparent'
const BUNDLE_CSS = 'bg-transparent font-k2d'

interface InfoCardProps {
  head: string;
  body: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ head, body }) => (
  <div className={BUNDLE_CSS}>
    <span className={HEAD_CSS}>{head}</span>
    <span className={BODY_CSS}>{body}</span>
  </div>
);

const ProfileInfo = () => {
  return (
    <div className='profile-info bg-transparent flex flex-row'>
      <div className='bg-transparent flex flex-row'>
        <img className='bg-white w-36 h-36 rounded-full ml-7 mr-10' src={IMG_URL} alt='fake-avartar' />
        <div className='bg-transparent mr-16'>
          <InfoCard head="Name." body="kim goorm" />
          <InfoCard head="Tell." body="010-1234-5678" />
          <InfoCard head="Add." body="Seoul, Korea" />
          <InfoCard head="Email." body="kimgoorm@gmail.com" />
          <InfoCard head="Bio." body="https://github.com/kimgoorm" />
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
