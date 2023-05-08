import React from 'react'
import SignOut from './SignOut'
function SideBar() {
  return (
    <div onScroll={(e)=>console.log(e)} className='h-screen w-[20%] sticky top-0 bg-blue-500'>
        <SignOut/>
    </div>
  )
}

export default SideBar