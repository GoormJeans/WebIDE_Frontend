import React, { useState } from 'react'
import { message, user } from "./type/type";
import Message from './Message';
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";

const MessagePanel: React.FC<{ user: user }> = ({ user }) => {

  //dummy user2

  const user2: user = {
    id: 2,
    image: "user2_image_url",
    name: "user2"
  }

  //dummy messages
  const dummies: message[] = [
    {
      id: 1,
      name: 'message1',
      content: 'hi',
      user: user,
      aid: 1,
      created_at: "2023. 12. 13. 오후 11:06:06"
    },
    {
      id: 2,
      name: 'message2',
      content: 'no hi',
      user: user2,
      aid: 1,
      created_at: "2023. 12. 23. 오후 11:06:06"
    },
  ]

  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState(dummies);
  const [searchResults, setSearchResults] = useState<message[]>([]);


  const renderMessages = (messages: message[]) =>
    messages.length > 0 &&
    messages.map(message =>
      <Message
        key={message.created_at}
        message={message}
        user={user}
      />
    )


  const handleSearchMessages = () => {
    const chatRoomMessages = [...messages];
    const regex = new RegExp(searchTerm, "gi");
    const searchResults = chatRoomMessages.reduce((acc: message[], message: message) => {
      if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
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