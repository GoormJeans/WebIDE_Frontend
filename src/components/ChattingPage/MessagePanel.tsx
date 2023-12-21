import React, { useEffect, useRef, useState } from 'react'
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";
import MessageComponent from "./MessageComponent";
import { Message } from "../../types/Message.type";
import { user1, user2 } from "../../types/DummyData";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";

const MessagePanel = () => {

  //dummy user2, 로그인해서 user에 대한 state가 생기기 전까지 일단 임시로 넣은 user
  const [user, setUser] = useState(false);
  //dummy 코드 끝

  const client = useRef<CompatClient>();
  const [join, setJoin] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessage, setChatMessage] = useState<Message>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");

  const chatroom = useParams();

  const handleConnect = () => {
    setJoin(!join);
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:8080/ws/chat");
      return sock;
    })
    setMessages([]);
    client.current.connect(
      { 'nickname': user1.nickname },
      () => {
        client.current!.subscribe(`/topic/chat/${chatroom.id}`, function (e) {

          //e.body에 전송된 data가 들어있다
          let chatMessage = JSON.parse(e.body);
          showMessage(chatMessage);
        });
        sendEnterMessage();
      }, function (e: any) {
        alert('에러발생!!!!');
      }
    )
  }

  // 채팅방 나가기
  const handleDisconnect = () => {
    setJoin(!join)
  }

  //메시지를 저장하는 부분
  const showMessage = (data: any) => {
    const newMessage = createMessage(data);
    setChatMessage(newMessage);
  }

  // 메시지 생성 로직
  const createMessage = (data: any) => {
    const message: Message = {
      createAt: new Date(data.createAt),
      nickname: data.nickname,
      content: data.content,
      id: data.chatId,
    }
    console.log('data', data);
    console.log('message', message);
    return message;
  }

  useEffect(() => {
    if (chatMessage) {
      setMessages([...messages, chatMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessage])

  // 입장 메시지 전송
  function sendEnterMessage() {
    const user_tmp = user ? user2 : user1
    const data = {
      'content': user_tmp.social_id
    };
    // send(destination,헤더,페이로드)
    client.current!.send("/app/chat/enter/3", {}, JSON.stringify(data));
    setContent("");
  }

  // 채팅 메시지 렌더링
  const renderMessages = (messages: Message[]) => {
    return messages.length > 0 &&
      messages.map(message =>
        <MessageComponent
          key={message.id}
          message={message}
          user={user2}
        />
      )
  }

  // 새로운 채팅 시 스크롤 아래로 고정
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, visible]);


  // 검색
  const handleSearchMessages = (e: any) => {
    e.preventDefault();
    if (searchTerm.length === 0) {
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

    setSearchResults(searchResults)
    setSearchTerm("");
  }

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  }


  //제출 시 할 일
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (content.length === 0) {
      return;
    }
    const data = {
      'content': content
    };
    //메시지를 저장하는 부분
    client.current!.send(`/app/chat/${chatroom.id}`, {}, JSON.stringify(data));
    setContent("");
  }

  return join ? (
    <div className="px-5 pt-5 h-[700px]">

      {/* dummy user change button */}
      <button onClick={() => setUser(!user)}>User</button>

      <MessageHeader handleSearchChange={handleSearchChange} handleSearchMessages={handleSearchMessages} visible={visible} setVisible={setVisible} searchTerm={searchTerm} />
      <div className="w-full h-full border-solid border-[.2rem] border-[#ececec] rounded-xl p-2 mb-2 overflow-y-auto">
        {visible ?
          renderMessages(searchResults)
          :
          renderMessages(messages)
        }
        {/* 스크롤 하단 고정용 */}
        <div ref={messageEndRef}></div>
      </div>

      {/* dummy user version */}
      <MessageForm handleSubmit={handleSubmit} content={content} setContent={setContent} />
      <button className="mt-3 pl-3 pr-3 w-full bg-red-400  hover:bg-red-700 text-white font-bold my-1 ml-2 rounded shadow-md hover:shadow-lg transition duration-150 ease-in-out" onClick={handleDisconnect}>채팅방 나가기</button>
    </div>
  ) : (
    <div className="px-5 pt-5 h-[700px] flex items-center">
      <button className="pl-3 pr-3 bg-blue-400  hover:bg-blue-700 text-white font-bold my-1 ml-2 rounded shadow-md hover:shadow-lg transition duration-150 ease-in-out" onClick={handleConnect}>
        채팅 참가하기
      </button>
    </div>
  )
}

export default MessagePanel