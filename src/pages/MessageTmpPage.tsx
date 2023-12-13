import React, { useState } from 'react'
import MessagePanel from "../components/EditorPage/MessagePanel";
import { user } from "../components/AdminPage/type/type";

const MessageTmpPage = () => {
  const [visible, setVisible] = useState(true);

  //dummy user
  const user1: user = {
    id: 1,
    image: "user1_image_url",
    name: "user1"
  }


  return (
    <div>
      <button onClick={() => {
        setVisible(!visible)
      }}>
        showMessage
      </button>
      <div >
        {visible && <MessagePanel user={user1} />}
      </div>
    </div>
  )
}

export default MessageTmpPage