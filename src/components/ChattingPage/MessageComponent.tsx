import React from 'react'
import { Message } from "../../types/Message.type";

interface MessageType {
  message: Message;
  userNickname: string;
}

const MessageComponent: React.FC<MessageType> = ({ message, userNickname }) => {

  // 이 메시지가 내 메시지인지 식별
  const isMessageMine = (message: Message, userNickname: string) => {
    if (userNickname) { return message.nickname === userNickname }
  }

  return (
    message.type === "MESSAGE" || message.type === undefined ? //message 타입인지 아닌지에 따라 디자인 변경
      <div className={`flex mb-3 ${isMessageMine(message, userNickname) ? 'justify-end' : 'justify-start' /* 내 메시지면 다르게 표시 */} `}>
        <div className={`w-fit ${isMessageMine(message, userNickname) ? 'bg-slate-300' : 'bg-white'} px-3 py-2 rounded-xl`}>
          <h6 className="mt-0">{message.nickname}{' '}
            <span className="text-[10px] text-gray-600">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </h6>
          <p className="text-sm">
            {message.content}
          </p>
        </div>
      </div >
      :
      <div className="flex mb-3 justify-center  px-3 py-2">
        {message.content}
      </div >
  )
}

export default MessageComponent