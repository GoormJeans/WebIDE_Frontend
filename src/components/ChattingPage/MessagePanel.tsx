import React, { useEffect, useRef, useState } from 'react'
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";
import MessageComponent from "./MessageComponent";
import { Message } from "../../types/Message.type";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../api/store";

const MessagePanel = () => {

  const client = useRef<CompatClient>();
  const [join, setJoin] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessage, setChatMessage] = useState<Message>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");

  const chatroom = useParams();

  const user = useSelector((state: RootState) => state.user);


  // 창 닫을 경우 chat 종료 요청 서버로 전송
  useEffect(() => {
    const handleUnload = async (e: any) => {
      e.preventDefault();
      if (client.current?.connected) {
        await axios.get(`/chat/exit/${chatroom.id}?nickname=${user.nicknameValue}`);
      }
    }
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnect = () => {
    setJoin(!join);
    console.log(chatroom);

    let accessToken = localStorage.getItem('AccessToken');
    let str = 'Bearer ' + accessToken;

    client.current = Stomp.client("wss://eb.goojeans-server.com/ws/chat")
    setMessages([]);
    client.current.connect(
      { Authorization: str, },
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

  // 입장 메시지 전송
  function sendEnterMessage() {
    const data = {
      'content': user.nicknameValue
    };
    // send(destination,헤더,페이로드)
    client.current!.send(`/app/chat/enter/${chatroom.id}`, {}, JSON.stringify(data));
    setContent("");
  }

  // 채팅방 나가기
  const handleDisconnect = () => {
    setJoin(!join)

    client.current?.disconnect(
      async () => {
        try {
          await axios.get(`/chat/exit/${chatroom.id}?nickname=${user.nicknameValue}`);
        }
        catch (error) {
          console.log(error);
        }
      }
    );
  }

  //메시지를 저장하는 부분
  const showMessage = (data: any) => {
    const newMessage = createMessage(data);
    setChatMessage(newMessage);
  }

  // 메시지 생성 로직
  const createMessage = (data: any) => {
    const message: Message = {
      createdAt: new Date(data.createdAt),
      nickname: data.nickname,
      content: data.content,
      id: data.chatId,
      type: data.type,
    }
    return message;
  }

  useEffect(() => {
    if (chatMessage) {
      setMessages([...messages, chatMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessage])

  // 채팅 메시지 렌더링
  const renderMessages = (messages: Message[]) => {
    return messages.length > 0 &&
      messages.map(message =>
        <MessageComponent
          key={message.id}
          message={message}
          user={user}
        />
      )
  }

  // 새로운 채팅 시 스크롤 아래로 고정
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, visible]);


  // 검색
  const handleSearchMessages = async (e: any) => {
    e.preventDefault();
    if (searchTerm.length === 0) {
      return;
    }
    setVisible(true) //뒤로가기 버튼 숨김
    const request = await axios.get(`/chat/search/${chatroom.id}?keyword=${searchTerm}`);
    const searchResults = request.data.data;

    setSearchResults(searchResults);
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
    <div className="p-5 h-fit bg-[#AFAEAE] rounded-xl">

      <MessageHeader handleSearchChange={handleSearchChange} handleSearchMessages={handleSearchMessages} visible={visible} setVisible={setVisible} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSearchResults={setSearchResults} />
      <div className="w-full min-h-96 h-full border-solid border-[.2rem] border-[#ececec] rounded-xl p-2 mb-2 overflow-y-auto">
        {visible ?
          renderMessages(searchResults)
          :
          renderMessages(messages)
        }
        {/* 스크롤 하단 고정용 */}
        <div ref={messageEndRef}></div>
      </div>
      <MessageForm handleSubmit={handleSubmit} content={content} setContent={setContent} />
      <button className="mt-3 pl-3 pr-3 w-full bg-red-400  hover:bg-red-700 text-white font-bold my-1 ml-2 rounded shadow-md hover:shadow-lg transition duration-150 ease-in-out" onClick={handleDisconnect}>채팅방 나가기</button>
    </div>
  ) : (
    <div className="px-5 pt-5 w-fit bg-[#AFAEAE] h-96 flex items-center rounded-xl">
      <button className="pl-3 pr-3 bg-blue-400  hover:bg-blue-700 text-white font-bold my-1 ml-2 rounded shadow-md hover:shadow-lg transition duration-150 ease-in-out" onClick={handleConnect}>
        채팅 참가하기
      </button>
    </div>
  )
}

export default MessagePanel