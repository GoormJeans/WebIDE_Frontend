import React from 'react'


const MessageForm: React.FC<{ handleSubmit: any; content: string; setContent: any }> = ({ handleSubmit, content, setContent }) => {

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-row">
        <input className="w-full rounded-xl px-5" onChange={(e)=>setContent(e.target.value)} value={content} placeholder="Message Input"/>
        <button className="ml-2 bg-slate-400 px-3 py-2 text-white rounded-xl" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  )
}

export default MessageForm