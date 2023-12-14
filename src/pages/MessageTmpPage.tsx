import React, { useState } from 'react'
import MessagePanel from "../components/ChattingPage/MessagePanel";

const MessageTmpPage = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => {
        setVisible(!visible)
      }}>
        showMessage
      </button>
      <div >
        {visible && <MessagePanel />}
      </div>
    </div>
  )
}

export default MessageTmpPage