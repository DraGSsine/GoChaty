import React from 'react'
import Sponsore from './Sponsore'
function RightSideBar() {
  return (
    <div className=" rounded-b-none hidden md:block sticky top-0 w-[20%] bg-[#282828] rounded-3xl h-screen">
        <Sponsore/>
        <Sponsore/>
    </div>

  )
}

export default RightSideBar