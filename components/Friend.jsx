import React from "react";
import Image from "next/image";
import FriendProfile from "../public/77478b89aee3a9c48af9835a1b0e1db4.png";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
function Friend({userName,photoUrl,uuid}) {

  const {setdata} = useContext(SelectedChatContext)  
  const handleSelectedChat =()=>{
    setdata({uuid,userName,photoUrl})
  } 
  return (
    <div onClick={handleSelectedChat} className="flex  py-3 px-4 items-center transition duration-300 cursor-pointer hover:bg-[#2d2d2d]">
      <div>
        <Image
          className="rounded-full"
          src={FriendProfile}
          width={50}
          height={50}
          alt="profile"
        />
      </div>
      <div className="pl-5 w-full space-y-2 hidden lg:inline-block">
        <div className="flex justify-between">
          <span className=" font-semibold text-xl text-[#5b2dc3]">{userName}</span>
          <span className="text-white">17:56</span>
        </div>
        <div>
          <p className=" text-gray-300">Hello friend How are u</p>
        </div>
      </div>
    </div>
  );
}

export default Friend;
