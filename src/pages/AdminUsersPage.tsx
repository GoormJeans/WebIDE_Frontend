import React from 'react'
import UserChart from "../components/AdminPage/UserChart"
import UserList from "../components/AdminPage/UserList";


export interface UserType {
  id: number;
  nickname: string;
  email: string;
}

const AdminUsersPage = () => {



  // dummy users
  const users: UserType[] = [
    {
      id: 1,
      nickname: "test1",
      email: "test1@gmail.com",
    },
    {
      id: 2,
      nickname: "test2",
      email: "test2@naver.com",
    },
    {
      id: 3,
      nickname: "test3",
      email: "test3@gmail.com",
    }
  ]

  return (
    <div className="w-full h-full">
      <div className="w-auto h-80 flex flex-col mx-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl">
        <UserChart />
      </div>
      <div className="w-auto h-fit flex flex-col mx-5 mt-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl">
        <UserList users={users} />
      </div>
    </div>
  )
}

export default AdminUsersPage