import React from 'react'

const MessageBar = () => {
  return (
    <div className='h-[10vh] bg-[#1d1d25] flex justify-center items-center px-8 mb-5 gap-6 '>
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 ">
      <input type="text" className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none '/>
      </div>
    </div>
  )
}

export default MessageBar
