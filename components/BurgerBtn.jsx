import React from 'react'
import { useContext } from 'react'
import { SelectedChatContext } from '@/context/SelectedChatContext'
function BurgerBtn() {
    const {ShowSideBar,setShowSideBar} = useContext(SelectedChatContext)

  return (
    <div>
    <button 
    onClick={()=>setShowSideBar(!ShowSideBar)}
    className=" md:hidden z-50 absolute top-3 left-4 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#5b2dc3"
        class="w-9 h-9"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  </div>
  )
}

export default BurgerBtn