import React, { useEffect, useState } from 'react'
import { useParams } from "react-router"
import remarkGfm from "remark-gfm"
import Markdown from "react-markdown"
import axios from "../../api/axios"

const Description = () => {
  const param = useParams();
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getDescription = async () => {
      const request = await axios.get(`/editor/algorithm/${param.id}`)
      console.log(request.data);
      setDescription(request.data[0].algorithmText);
    }
    getDescription();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-3">
      <Markdown remarkPlugins={[remarkGfm]} className="w-full p-3 overflow-auto prose lg:prose-xl" children={description}></Markdown>
    </div>
  )
}

export default Description