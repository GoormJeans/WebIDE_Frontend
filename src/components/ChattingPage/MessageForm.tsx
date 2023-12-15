import React, { useState } from 'react'
import { UserInfo } from "../../types/UserInfo.type";
import { Message } from "../../types/Message.type";

const MessageForm: React.FC<{ user: UserInfo; messages: Message[]; setMessages: any }> = ({ user, messages, setMessages }) => {

  const [content, setContent] = useState("");
  const [messageId, setMessageId] = useState(0); // message ID 부여방식 확인 전까지 임시 ID

  const createMessage = () => {
    const message: Message = {
      created_at: new Date(),
      nickname: user.nickname,
      content: content,
      aid: 1,
      id: messageId,
    }
    setMessageId(messageId+1);
    return message;
  }

  const handleSubmit = (e:any) => {
    // if (!content) {
    //   setErrors(prev => prev.concat('Type contents first'));
    //   return;
    // }
    e.preventDefault()

    if(content.length===0){
      return;
    }
    //메시지를 저장하는 부분
    setMessages([...messages, createMessage()])
    setContent("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-row">
        <input className="w-full rounded-xl px-5" onChange={(e)=>setContent(e.target.value)} value={content} placeholder="Message Input"/>
        <button className="ml-5 bg-slate-400 px-5 py-2 text-white rounded-xl" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  )
}

export default MessageForm