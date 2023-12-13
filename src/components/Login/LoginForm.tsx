import KakaoIcon from '../../assets/images/kakao_icon.png'
import GoogleIcon from '../../assets/images/google_icon.png'
import NaverIcon from '../../assets/images/naver_icon.png'

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center">
      <input className="font-k2d bg-slate-300 px-5 py-3 mx-2 w-72 rounded-xl shadow-xl" type="email" placeholder="Enter email" /><br />
      <input className="font-k2d bg-slate-300 px-5 py-3 mx-2 w-72 rounded-xl shadow-xl" type="password" placeholder="password" /><br />
      <button className="font-k2d bg-nav-color px-5 py-3 mx-2 w-72 rounded-xl shadow-xl active:bg-slate-500">Login</button>
      <span className="font-k2d text-sm text-slate-700 mt-8 mb-5">Or continue with</span>
      <div className="w-full flex flex-row justify-evenly">
        <img src={GoogleIcon} alt="google icon" className="w-10 h-10 mx-2 shadow-2xl" onClick={() => { }} />
        <img src={NaverIcon} alt="naver icon" className="w-10 h-10 mx-2 shadow-2xl" onClick={() => { }} />
        <img src={KakaoIcon} alt="kakao icon" className="w-10 h-10 mx-2 shadow-2xl" onClick={() => { }} />
      </div>
    </div>
  )
}

export default LoginForm
