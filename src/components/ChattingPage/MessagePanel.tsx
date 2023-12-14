import React, { useState } from 'react'
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";
import MessageComponent from "./MessageComponent";
import { UserInfo } from "../../types/UserInfo.type";
import { Message } from "../../types/Message.type";

const MessagePanel = () => {

  //dummy user2, 로그인해서 user에 대한 state가 생기기 전까지 일단 임시로 넣은 user
  const user2: UserInfo = {
    name: 'Kim Goorm',
    address: 'Seoul, Korea',
    email: 'kimgoorm@gmail.com',
    bio: 'https://github.com/kimgoorm',
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchResults, setSearchResults] = useState<Message[]>([]);


  const renderMessages = (messages: Message[]) =>
    messages.length > 0 &&
    messages.map(message =>
      <MessageComponent
        key={message.created_at.toLocaleString()}
        message={message}
        user={user2}
      />
    )


  const handleSearchMessages = () => {
    const chatRoomMessages = [...messages];
    const regex = new RegExp(searchTerm, "gi");
    const searchResults = chatRoomMessages.reduce((acc: Message[], message: Message) => {
      if ((message.content && message.content.match(regex)) || message.nickname.match(regex)) {
        acc.push(message)
      }
      return acc;
    }, []);
    setSearchResults(searchResults)
    console.log(chatRoomMessages);
  }

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    handleSearchMessages()
  }

  return (
    <div className="px-8 pt-8">
      <MessageHeader handleSearchChange={handleSearchChange} />
      <div className="w-full h-96 border-solid border-[.2rem] border-[#ececec] rounded-xl p-4 mb-4 overflow-y-auto">
        {searchTerm ?
          renderMessages(searchResults)
          :
          renderMessages(messages)
        }
      </div>

      <MessageForm user={user2} messages={messages} setMessages={setMessages} />
    </div>
  )
}

export default MessagePanel