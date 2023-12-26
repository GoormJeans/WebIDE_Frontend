import React, { useEffect, useState } from 'react'

interface TestCaseInputType {
  id: number;
  input: string[];
  setInput: any;
  output: string[];
  setOutput: any;
}

const TestCaseInput: React.FC<TestCaseInputType> = ({ id, input, setInput, output, setOutput }) => {
  const [ipValue, setIpValue] = useState(input[id]);
  const [opValue, setOpValue] = useState(output[id]);

  useEffect(() => {
    input[id] = ipValue;
    setInput([...input]);
  }, [ipValue])

  useEffect(()=>{
    output[id] = opValue;
    setOutput([...output]);
  }, [opValue])
  

  return (
    <div className="w-full">
      <div className="flex flex-row w-full text-xl">Test Case {id+1}</div>
      <div className="flex flex-row w-full">
        <div className="w-full mr-5">
          <p>Input</p>
          <input type="text" className="bg-white text-xl mb-5 w-full" value={ipValue} onChange={(e) => setIpValue(e.target.value)} />
        </div>
        <div className="w-full ">
          <p className=" ">Output</p>
          <input type="text" className="bg-white text-xl mb-5 w-full" value={opValue} onChange={(e) => setOpValue(e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default TestCaseInput