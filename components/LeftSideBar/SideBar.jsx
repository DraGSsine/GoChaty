import React, { useEffect, useState } from "react";
import SignOut from "./SignOut";
import { auth } from "@/Firebase/firebase";
import Image from "next/image";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import Search from "../Search";
function SideBar() {
  const {ShowSideBar,setShowSideBar}=useContext(SelectedChatContext)

  const [CurrentUser, setCurrentUser] = useState();
  useEffect(() => {
    setTimeout(() => {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUserUid")));
    }, 500);
  }, [])
  
  console.log(ShowSideBar)
  return (
    <div className={`${ShowSideBar?'flex absolute w-8/12 z-10 rounded-none left-0':' hidden'} md:flex pt-12 md:pt-0 flex-col md:rounded-b-none md:pb-28 h-screen w-[20%] md:sticky top-0 rounded-t-3xl bg-[#282828]`}>
      <div>
        <div className=" relative bg-[#1A1A1A] rounded-3xl m-2 h-40">
          <Image
            className={`${!CurrentUser?.photoUrl&&'bg-gray-400 animate-pulse'} h-32 w-32 absolute -bottom-12 left-[50%] -translate-x-[50%] rounded-full`}
            src={CurrentUser?.photoUrl}
            width={100}
            height={100}
            alt=""
          />
        </div>
      </div>
      <div className='md:hidden border-t mt-40 py-4 px-4'>
      {
        <Search/>
      }
      </div>
      <div className=" justify-between w-[18%] fixed bottom-4 flex px-4">
        <h1 className=" capitalize text-gray-300">@{CurrentUser?.userName}</h1>
        <SignOut />
      </div>
    </div>
  );
}

export default SideBar;
