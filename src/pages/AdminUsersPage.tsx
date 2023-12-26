import React, { useEffect, useState } from 'react'
import UserChart from "../components/AdminPage/UserChart"
import UserList from "../components/AdminPage/UserList";
import axios from "../api/axios"
import { UserInfo } from "../types/UserInfo.type";

const AdminUsersPage = () => {

  const [users, setUsers] = useState<UserInfo[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const request = await axios.get('/api/admin/user');
        setUsers(request.data);
        console.log(request);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchUsers();
  }, [])

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