import React from 'react'
import { Message } from "../../types/Message.type";
import { UserInfo } from "../../types/UserInfo.type";

interface MessageType {
  message: Message;
  user: UserInfo;
}

const MessageComponent: React.FC<MessageType> = ({ message, user }) => {

  // 이 메시지가 내 메시지인지 식별
  const isMessageMine = (message: Message, user: UserInfo) => {
    if (user) { return message.nickname === user.nickname }
  }

  return (
    <div className={`flex mb-3 ${isMessageMine(message, user) ? 'justify-end' : 'justify-start' /* 내 메시지면 다르게 표시 */} `}>
      {/* user profile 이미지 미정, 나중에 DB에 프로필 이미지 링크도 넣어달라 해야할 수도 있음 자기거면 이미지 왼쪽, 아니면 이미지 오른쪽*/}
      {!isMessageMine(message, user) && <img className="mr-3 rounded-xl w-12 h-12" src='#' alt={message.nickname} />}{/* src={user의 image 찾는 코드 넣어야됨} */}
      <div className="w-fit bg-white px-3 py-2 rounded-xl">
        <h6 className="mt-0">{message.nickname}{' '}
          <span className="text-[10px] text-gray-600">
            {message.created_at.toLocaleString()}
          </span>
        </h6>
        <p>
          {message.content}
        </p>
      </div>
      {isMessageMine(message, user) && <img className="ml-3 rounded-xl w-12 h-12" src='#' alt={message.nickname} />}{/* src={user의 image 찾는 코드 넣어야됨} */}
    </div >
  )
}

export default MessageComponent