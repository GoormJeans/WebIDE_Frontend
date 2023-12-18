import { EditMyInfo } from '../components/EditInfoPage/EditMyInfo'
import { ChangePassword } from '../components/EditInfoPage/ChangePassword'
import { DeleteAccount } from '../components/EditInfoPage/DeleteAccount'

const EditUserInfo = () => {
  return (
    <>
      <EditMyInfo />
      <ChangePassword />
      <DeleteAccount />
    </>
  )
}

export default EditUserInfo
