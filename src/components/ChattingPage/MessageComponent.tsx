import React from 'react'
import { Message } from "../../types/Message.type";
import { UserInfo } from "../../types/UserInfo.type";

interface MessageType {
  message: Message;
  user: UserInfo;
}

const MessageComponent: React.FC<MessageType> = ({ message, user }) => {

  // 메시지가 이미지인지 식별하는 코드
  // const isImage = (message: any) => {
  //   return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
  // }

  // 이 메시지가 내 메시지인지 식별
  const isMessageMine = (message: Message, user: UserInfo) => {
    if (user) { return message.nickname === user.nickname }
  }

  return (
    <div className={`flex mb-3 ${isMessageMine(message, user) ? 'justify-end' : 'justify-start' /* 내 메시지면 다르게 표시 */} `}>
      {/* user profile 이미지 미정, 나중에 DB에 프로필 이미지 링크도 넣어달라 해야할 수도 있음 */}
      {/* <img className="mr-3 rounded-xl w-12 h-12" src={message.user.image} alt={message.user.name} /> */}
      <div className="w-fit bg-white px-5 py-2 rounded-xl">
        <h6 className="mt-0">{message.nickname}{' '}
          <span className="text-[10px] text-gray-600">
            {message.created_at.toLocaleString()}
          </span>
        </h6>
        <p>
          {message.content}
        </p>
      </div>
    </div >
  )
}

export default MessageComponent