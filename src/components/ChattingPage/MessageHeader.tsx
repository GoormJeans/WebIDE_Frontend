import React from 'react'

const MessageHeader: React.FC<{ handleSearchChange: any }> = ({ handleSearchChange }) => {


  return (
    <div style={{
      width: '100%',
      height: '170px',
      border: '.2rem solid #ececec',
      borderRadius: '4px',
      padding: '1rem',
      marginBottom: '1rem'
    }}>
      <input
        className="mb-3"
        placeholder="Search Messages"
        aria-label="Search"
        aria-describedby="basic-addon1"
        onChange={handleSearchChange}
      />

    </div>
  )
}

export default MessageHeader