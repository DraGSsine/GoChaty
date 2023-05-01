import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Info } from "@/public/Icons";
import FriendProfile from "../public/77478b89aee3a9c48af9835a1b0e1db4.png";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import { auth } from "@/Firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
function MessagesForm() {
  const { data, setlastMessage } = useContext(SelectedChatContext);
  const [Chats, setChats] = useState([]);

  const getAllDataFromFireBase = async () => {
    setChats([]);
    const combaindId =
      auth?.currentUser.uid > data.uuid
        ? auth.currentUser.uid + data.uuid
        : data.uuid + auth.currentUser.uid;

    const docRef = doc(db, "chats", combaindId);
    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setChats(doc.data());
        setlastMessage(doc.data());
      } else {
        setChats([]);
      }
    });
  };
  useEffect(() => {
    getAllDataFromFireBase();
  }, [data]);
  return (
    <>
      {data.uuid ? (
        <div className="bg-[#282828] mx-5 w-11/12 h-[92vh] lg:h-[87vh] lg:w-8/12 rounded-t-3xl flex flex-col">
          <div className="flex py-3 px-4 items-center cursor-pointer border-b-2 border-[#dbdadc]">
            <div>
              <Image
                className="rounded-full"
                src={FriendProfile}
                width={80}
                height={60}
                alt="profile"
              />
            </div>
            <div className="pl-5 w-full flex justify-between">
              <div className="flex flex-col justify-center ">
                <span className=" font-semibold text-xl text-[#ffffff]">
                  {data.userName}
                </span>

                <p className=" text-green-500">online</p>
              </div>
              <div>
                <span className="text-white px-7">
                  <Info />
                </span>
              </div>
            </div>
          </div>
          <div className=" h-full overflow-y-scroll">
            {Chats?.message?.map((chat, index) => (
              <Message
                key={index}
                message={chat.messageDetails.Text}
                user={chat.messageDetails.user}
              />
            ))}
          </div>
          <div className="p-4">
            <MessageInput />
          </div>
        </div>
      ) : (
        <div className="bg-[#282828] items-center justify-center mx-5 w-11/12 h-[92vh] lg:h-[87vh] lg:w-8/12 rounded-t-3xl flex flex-col">
          <h1 className=" font-bold select-none text-4xl underline text-[#5B2DC3]">
            Let&apos; Start Chat!
          </h1>
        </div>
      )}
    </>
  );
}

export default MessagesForm;
