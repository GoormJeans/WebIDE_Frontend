import React, { useEffect, useState } from 'react'
import UserList from "../components/AdminPage/UserList";
import axios from "../api/axios"
import SearchUser from "../components/AdminPage/SearchUser";

export interface AdminUserInfo {
  id: number;
  email: string;
  nickname: string;
  bio: string;
  city: string;
  socialId: string;
  createdAt: Date;
}

const AdminUsersPage = () => {

  const [users, setUsers] = useState<AdminUserInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [initUsers, setInitUsers] = useState<AdminUserInfo[]>([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const request = await axios.get('/admin/user');
        setUsers(request.data);
        setInitUsers(request.data);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchUsers();
  }, [])

  // 여기서 검색결과 필터링 해서 UserList에 prop으로 넘겨줌
  useEffect(() => {
    setUsers(initUsers)
    if (searchTerm !== null && searchTerm.trim().length !== 0) {
      setUsers(Object.values(initUsers).filter((element) => element.nickname.includes(searchTerm.trim())
      || element.city.includes(searchTerm.trim())
      || element.email.includes(searchTerm.trim())
      || element.id === parseInt(searchTerm.trim())));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])


  return (
    <div className="w-full h-full">
      <SearchUser setSearchTerm={setSearchTerm} />
      <div className="w-auto h-fit flex flex-col mx-5 mt-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl">
        <UserList users={users} />
      </div>
    </div>
  )
}

export default AdminUsersPage