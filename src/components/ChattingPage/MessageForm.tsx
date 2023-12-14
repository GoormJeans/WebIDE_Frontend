import React, { useState } from 'react'
import { message, user } from "./type/type"

const MessageForm: React.FC<{ user: user; messages: message[]; setMessages: any }> = ({ user, messages, setMessages }) => {

  const [content, setContent] = useState("");

  const createMessage = () => {
    const date = new Date();

    const message: message = {
      created_at: date.toLocaleString(),
      user: {
        id: user.id,
        name: user.name,
        image: user.image
      },
      content: content,
      aid: 1,
      name: 'message' + user.id,
      id: user.id
    }
    return message;
  }

  const handleSubmit = (e:any) => {
    // if (!content) {
    //   setErrors(prev => prev.concat('Type contents first'));
    //   return;
    // }
    e.preventDefault()
    //메시지를 저장하는 부분
    setMessages([...messages, createMessage()])
    setContent("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="w-full" onChange={(e)=>setContent(e.target.value)} value={content}/>
        <button className="w-full" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  )
}

export default MessageForm