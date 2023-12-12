import React from 'react'

const AddAlgoPage = () => {
  return (
    <div className="w-full h-full">
      <form className="w-auto h-fit flex flex-col mx-5 p-5 whitespace-nowrap bg-nav-color shadow-xl rounded-xl mt-5">
        <label htmlFor="algo_name" className="bg-transparent text-xl">Algorithm Name</label>
        <input type="text" id="algo_name" className="bg-white text-xl mb-5" />

        <label htmlFor="algo_name" className="bg-transparent text-xl">Algorithm Level</label>
        <select className="bg-white text-xl mb-5">
          <option>level1</option>
          <option>level2</option>
          <option>level3</option>
          <option>level4</option>
        </select>

        <label htmlFor="algo_content" className="bg-transparent text-xl">Algorithm Contents</label>
        <input type="text" id="algo_content" className="bg-white text-xl mb-5" />

        <div className="bg-transparent flex flex-row w-full text-xl">Test Case 1</div>
        <div className="bg-transparent flex flex-row w-full">
          <div className="w-full mr-5  bg-transparent">
            <p className=" bg-transparent">Input</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" />
          </div>
          <div className="w-full bg-transparent">
            <p className=" bg-transparent">Output</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" />
          </div>
        </div>

        <div className="bg-transparent flex flex-row w-full text-xl">Test Case 2</div>
        <div className="bg-transparent flex flex-row w-full">
          <div className="w-full mr-5  bg-transparent">
            <p className=" bg-transparent">Input</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" />
          </div>
          <div className="w-full bg-transparent">
            <p className=" bg-transparent">Output</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" />
          </div>
        </div>

        <div className="bg-transparent flex flex-row w-full text-xl">Test Case 3</div>
        <div className="bg-transparent flex flex-row w-full">
          <div className="w-full mr-5  bg-transparent">
            <p className=" bg-transparent">Input</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" />
          </div>
          <div className="w-full bg-transparent">
            <p className=" bg-transparent">Output</p>
            <input type="text" className="bg-white text-xl mb-5 w-full" />
          </div>
        </div>

      </form>
    </div>
  )
}

export default AddAlgoPage