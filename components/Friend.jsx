import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import { auth, db } from "@/Firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { UseDate } from "@/Hooks/UseDate";
function Friend({ userName, photoUrl, uuid }) {
  const {data, setdata } = useContext(SelectedChatContext);
  const [lastMessage, setlastMessage] = useState(null);
  const [seen, setSeen] = useState(true);
  const [online, setOnline] = useState(false);


  useEffect(() => {
    const unsubscribe = getTheLastMessage();
    const unsubscribeStatus = getUserStatus()
    return () => {
      unsubscribe();
      unsubscribeStatus()
    };
  }, [data]);
  const getTheLastMessage = () => {
    const combinedId =
      auth.currentUser.uid > uuid
        ? auth.currentUser.uid + uuid
        : uuid + auth.currentUser.uid;

    const docRef = doc(db, "chats", combinedId);
    return onSnapshot(docRef, (doc) => {
      setlastMessage(
        doc.data()?.message[doc.data()?.message.length - 1].messageDetails
      );
      if (uuid == data.uuid || doc.data() == undefined || doc.data()?.message[doc.data()?.message.length - 1].messageDetails.user == auth.currentUser.uid) {
        setSeen(true);
      } else {
        setSeen(false);
      }
    });
  };
  const getUserStatus = () => {
    const docRef = doc(db, "users", uuid);
    return onSnapshot(docRef, (doc) => {
      setOnline(doc.data()?.online)
    })
  }
  const handleSelectedChat = async () => {
    const selectedChat = JSON.stringify({ uuid, userName, photoUrl })
    localStorage.setItem('selectedChat',selectedChat)
    setdata({ uuid, userName, photoUrl });
  }
  return (
    <div
      onClick={handleSelectedChat}
      className={`${
        lastMessage?.seen || seen ? " bg-[#282828]" : "bg-[#5b2dc3]"
      } lg:p-3 rounded-full flex p-1 lg:rounded-none items-center transition duration-300 cursor-pointer hover:bg-[#2d2d2d]`}
    >
      <div className=" relative">
      <div className={` ${online?'bg-green-500':'bg-gray-500'}  top-1 absolute w-3 h-3  rounded-full right-0`}></div>
        <Image
          className="rounded-full h-14 w-14 lg:w-16"
          src={photoUrl}
          alt="userProfile"
          width={100}
          height={100}
          objectFit="cover"
        />
      </div>
      <div className="pl-5 w-full hidden lg:inline-block ">
        <div className="flex justify-between">
          <span
            className={`${

              lastMessage?.seen || seen ? "text-[#5b2dc3]" : " text-[#000000]"
            } font-semibold text-xl`}
          >
            {userName}
          </span>
          <span className="text-white">
            {lastMessage ? UseDate(lastMessage.createdAt) : <></>}
          </span>
        </div>
        <div>
          <p className=" text-gray-300">
            {lastMessage &&
              (lastMessage.user == auth.currentUser.uid
                ? `You: ${lastMessage.Text}`
                : lastMessage.Text)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Friend;
