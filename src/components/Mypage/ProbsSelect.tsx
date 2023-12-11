import React from 'react'

export const CategoryBtn = () => {
  return (
    <>
      <button
        // className={`rounded-full px-4 py-2 ${selectedButton === 'solved' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        className={`font-k2d text-sm font-semibold rounded-full px-6 py-2 mr-3 mt-5  bg-gray-300 hover:opacity-75`}
      // onClick={() => handleButtonClick('solved')}
      >
        Solved
      </button>
      <button
        // className={`rounded-full px-4 py-2 ${selectedButton === 'tried' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        className={`font-k2d text-sm font-semibold rounded-full px-7 py-2 mr-3 mt-5 bg-gray-300 hover:opacity-75`}
      // onClick={() => handleButtonClick('tried')}
      >
        Tried
      </button>
      <button
        // className={`rounded-full px-4 py-2 ${selectedButton === 'saved' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        className={`font-k2d text-sm font-semibold rounded-full px-6 py-2 mr-3 mt-5 bg-gray-300 hover:opacity-75`}

      // onClick={() => handleButtonClick('saved')}
      >
        Saved
      </button>
    </>
  )
}

