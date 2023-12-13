import React from 'react'
import { UserType } from "../../pages/AdminUsersPage"
import UserComponent from "./UserComponent";

const UserList: React.FC<{ users: UserType[] }> = ({ users }) => {



  return (
      <div className="w-auto h-full flex flex-col justify-between items-center  bg-nav-color m-5 rounded-xl px-5 pt-5 border-2 whitespace-nowrap">
        {
          users.map((element) =>
            <UserComponent
              key={element.id}
              id={element.id}
              nickname={element.nickname}
              email={element.email}
            />)
        }
      </div>
  );
}

export default UserList