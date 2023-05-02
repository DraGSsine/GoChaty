import React, { useEffect, useState } from "react";
import Image from "next/image";
import FriendProfile from "../public/77478b89aee3a9c48af9835a1b0e1db4.png";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import { auth, db } from "@/Firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { UseDate } from "@/Hooks/UseDate";

function Friend({ userName, photoUrl, uuid }) {
  const { data, setdata } = useContext(SelectedChatContext);
  const [lastMessage, setlastMessage] = useState(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const unsubscribe = getTheLastMessage()
    return () => {
      unsubscribe();
    };
  }, []);

  const getTheLastMessage = () => {
    const combinedId =
      auth.currentUser.uid > uuid ? auth.currentUser.uid + uuid : uuid + auth.currentUser.uid;

    const docRef = doc(db, "chats", combinedId);
    return onSnapshot(docRef, (doc) => {
      setlastMessage(doc.data()?.message[doc.data()?.message.length-1].messageDetails);
      if(doc.data()?.message[doc.data()?.message.length-1].messageDetails.user == auth.currentUser.uid ||doc.data()?.message[doc.data()?.message.length-1].messageDetails.user==uuid){
        setSeen(true)
      }else{
        setSeen(false)
      }
    });
  };

  const handleSelectedChat = () => {
    setSeen(true);
    setdata({ uuid, userName, photoUrl });
  };
  return (
    <div
      onClick={handleSelectedChat}
      className={`${!seen && uuid != data.uuid ? " bg-[#5b2dc3]" : " bg-[#282828]"} flex py-3 items-center transition duration-300 cursor-pointer p-5 hover:bg-[#2d2d2d]`}
    >
      <div>
        <Image
          className="rounded-full"
          src={FriendProfile}
          width={55}
          height={55}
          alt="profile"
        />
      </div>
      <div className="pl-5 w-full hidden lg:inline-block ">
        <div className="flex justify-between">
          <span
            className={`${
              !seen ? " text-[#000000]" : "text-[#5b2dc3]"
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
