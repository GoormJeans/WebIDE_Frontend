import React from 'react'
import { message, user } from "./type/type";

interface MessageType {
  message: message;
  user: user;
}

const Message: React.FC<MessageType> = ({ message, user }) => {



  // 메시지가 이미지인지 식별하는 코드
  // const isImage = (message: any) => {
  //   return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
  // }

  // 이 메시지가 내 메시지인지 식별
  const isMessageMine = (message: message, user: user) => {
    if (user) { return message.user.id === user.id }
  }

  return (
    <div className="mb-1">
      <img className="mr-3 rounded-xl w-12 h-12" src={message.user.image} alt={message.user.name} />
      <div className={`${isMessageMine(message, user)? 'bg-[#ececec]':'bg-blue-200'} `} >
        <h6 className="mt-0">{message.user.name}{' '}
          <span className="text-[10px] text-gray-600">
            {message.created_at}
          </span>
        </h6>
        <p>
          {message.content}
        </p>
      </div>
    </div >
  )
}

export default Message