import React, { useEffect, useState } from "react";
import Image from "next/image";
import FriendProfile from "../public/77478b89aee3a9c48af9835a1b0e1db4.png";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import { auth, db } from "@/Firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { UseDate } from "@/Hooks/UseDate";
function Friend({ userName, photoUrl, uuid }) {
  const { data, setdata } = useContext(SelectedChatContext);
  const [lastMessage, setlastMessage] = useState(null);
  const [Seen, setSeen] = useState(false);

  const handleSelectedChat = () => {
    setSeen(true);
    setdata({ uuid, userName, photoUrl });
  };
  const GetTheLastMessage = async () => {
    const combaindId =
      auth.currentUser.uid > uuid
        ? auth.currentUser.uid + uuid
        : uuid + auth.currentUser.uid;

    const docRef = doc(db, "chats", combaindId);
    onSnapshot(docRef, (doc) => {
      setlastMessage(doc.data()?.message);
      if (
        doc.data()?.message[doc.data()?.message.length - 1].messageDetails
          .user == auth.currentUser.uid
      ) {
        setSeen(true);
      } else {
        if (uuid == data.uuid) {
          setSeen(true);
        } else {
          setSeen(false);
          console.log("not seen");
        }
      }
    });
  };
  useEffect(() => {
    GetTheLastMessage();
  }, []);
  return (
    <div
      onClick={handleSelectedChat}
      className={`${
        !Seen ? " bg-[#5b2dc3]" : " bg-[#282828]"
      } flex py-3 items-center transition duration-300 cursor-pointer p-5 hover:bg-[#2d2d2d]`}
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
              !Seen ? " text-[#000000]" : "text-[#5b2dc3]"
            } font-semibold text-xl text-[#5b2dc3]`}
          >
            {userName}
          </span>
          <span className="text-white">
            {lastMessage &&
              UseDate(
                lastMessage[lastMessage.length - 1]?.messageDetails.createdAt
              )}
          </span>
        </div>
        <div>
          <p className=" text-gray-300">
            {lastMessage &&
              (lastMessage[lastMessage.length - 1]?.messageDetails.user ==
              auth.currentUser.uid
                ? `You: ${
                    lastMessage[lastMessage.length - 1]?.messageDetails.Text
                  }`
                : lastMessage[lastMessage.length - 1]?.messageDetails.Text)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Friend;
