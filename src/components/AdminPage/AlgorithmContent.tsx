import React from 'react'
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


const AlgorithmContent: React.FC<{ contents: string; setContents: any }> = ({ contents, setContents }) => {
  return (
    <div className="flex flex-col ">
      <div className="bg-transparent text-xl mb-3">Algorithm Contents</div>
      <div className="flex flex-row">
        <textarea id="algo_content" className="bg-white mb-5 mr-5 w-full rounded-xl p-3" value={contents} onChange={(e) => setContents(e.target.value)} />
        <Markdown remarkPlugins={[remarkGfm]} className="w-full border-2 p-3 overflow-auto prose lg:prose-xl" >{contents}</Markdown>
      </div>
    </div>
  )
}

export default AlgorithmContent