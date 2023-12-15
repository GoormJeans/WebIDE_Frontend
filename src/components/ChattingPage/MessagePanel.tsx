import React, { useEffect, useRef, useState } from 'react'
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";
import MessageComponent from "./MessageComponent";
import { UserInfo } from "../../types/UserInfo.type";
import { Message } from "../../types/Message.type";
// import axios from "../../api/axios";

const MessagePanel = () => {

  //dummy user2, 로그인해서 user에 대한 state가 생기기 전까지 일단 임시로 넣은 user
  const user2: UserInfo = {
    name: 'Kim Goorm',
    address: 'Seoul, Korea',
    email: 'kimgoorm@gmail.com',
    bio: 'https://github.com/kimgoorm',
  }
  const user1: UserInfo = {
    name: 'Lee Goorm',
    address: 'Jeju, Korea',
    email: 'leegoorm@naver.com',
    bio: 'https://github.com/leegoorm',
  }

  const [user, setUser] = useState(false);

  //dummy 코드 끝

  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [visible, setVisible] = useState(false);


  const renderMessages = (messages: Message[]) =>
    messages.length > 0 &&
    messages.map(message =>
      <MessageComponent
        key={message.id}
        message={message}
        user={user2}
      />
    )

  // 새로운 채팅 시 스크롤 아래로 고정
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior:'smooth'})
  }, [messages, visible]);

  const handleSearchMessages = (e: any) => {
    e.preventDefault();

    if(searchTerm.length===0){
      return;
    }

    setVisible(true) //뒤로가기 버튼 숨김

    // Local Search Logic
    const chatRoomMessages = [...messages];
    const regex = new RegExp(searchTerm, "gi");
    const searchResults = chatRoomMessages.reduce((acc: Message[], message: Message) => {
      if ((message.content && message.content.match(regex)) || message.nickname.match(regex)) {
        acc.push(message)
      }
      return acc;
    }, []);

    // DB Search Logic
    // const request = axios.get()

    setSearchResults(searchResults)
    setSearchTerm("");
  }

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="px-8 pt-8">
      {/* dummy user change button */}
      <button onClick={() => setUser(!user)}>User</button>
      <MessageHeader handleSearchChange={handleSearchChange} handleSearchMessages={handleSearchMessages} visible={visible} setVisible={setVisible} searchTerm={searchTerm} />
      <div className="w-full h-96 border-solid border-[.2rem] border-[#ececec] rounded-xl p-4 mb-4 overflow-y-auto">
        {visible ?
          renderMessages(searchResults)
          :
          renderMessages(messages)
        }
        {/* 스크롤 하단 고정용 */}
        <div ref={messageEndRef}></div>
      </div>

      {/* dummy user version */}
      <MessageForm user={user ? user2 : user1} messages={messages} setMessages={setMessages} />
    </div>
  )
}

export default MessagePanel