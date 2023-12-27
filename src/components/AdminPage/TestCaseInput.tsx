import React, { useEffect, useState } from 'react'

interface TestCaseInputType {
  id: number;
  input: string[];
  setInput: any;
  output: string[];
  setOutput: any;
  handleRemoveTC: any;
}

const TestCaseInput: React.FC<TestCaseInputType> = ({ id, input, setInput, output, setOutput, handleRemoveTC }) => {
  const [ipValue, setIpValue] = useState(input[id]);
  const [opValue, setOpValue] = useState(output[id]);

  useEffect(() => {
    input[id] = ipValue;
    setInput([...input]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipValue])

  useEffect(() => {
    output[id] = opValue;
    setOutput([...output]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opValue])

  return (
    <div className="w-full">
      <div className="flex flex-row w-full text-xl">Test Case {id + 1}</div>
      <div className="w-full flex flex-row">
        <div className="flex flex-row w-full">
          <div className="w-full mr-5">
            <p>Input</p>
            <textarea className="bg-white text-sm mb-5 w-full" value={ipValue} onChange={(e) => setIpValue(e.target.value)} />
          </div>
          <div className="w-full ">
            <p className=" ">Output</p>
            <textarea className="bg-white text-sm mb-5 w-full" value={opValue} onChange={(e) => setOpValue(e.target.value)} />
          </div>
        </div>
        <button id={id.toString()} onClick={handleRemoveTC} className="w-fit p-5 text-red-600">삭제</button>
      </div>
    </div>
  )
}

export default TestCaseInput