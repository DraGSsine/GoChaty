import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Info } from "@/public/Icons";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
function MessagesForm() {
  const ref = useRef();
  const { data } = useContext(SelectedChatContext);
  const [Chats, setChats] = useState([]);

  const [SelectedChat, SetSelectedChat] = useState(null);
  const getAllDataFromFireBase = () => {
    const selectedChat = localStorage.getItem("selectedChat");
    const SelectChat = JSON.parse(selectedChat);
    const uid = JSON.parse(localStorage.getItem("currentUserUid"));
    console.log(uid);
    SetSelectedChat(JSON.parse(selectedChat));
    const combaindId =
      uid.uid > SelectChat?.uuid
        ? uid.uid + SelectChat?.uuid
        : SelectChat?.uuid + uid.uid;
    const docRef = doc(db, "chats", combaindId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setChats(doc.data());
      } else {
        setChats([]);
      }
    });

    return unsubscribe; // return a function to clean up the listener
  };
  useEffect(() => {
    const unsubscribe = getAllDataFromFireBase();
    return () => {
      unsubscribe();
    }; // clean up the listener when the component unmounts
  }, [data]);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [Chats]);

  return (
    <>
      {SelectedChat ? (
        <div className="bg-[#282828] mx-5 w-11/12 h-[90vh] lg:h-[87vh] lg:w-8/12 rounded-t-3xl flex flex-col">
          <div className="flex px-3 lg:py-3 lg:px-4 items-center cursor-pointer border-b-2 border-[#dbdadc]">
            <div>
              <Image
                className="rounded-full h-14 w-16"
                src={SelectedChat.photoUrl}
                alt="userProfile"
                width={100}
                height={100}
                objectFit="fill"
              />
            </div>
            <div className="pl-5 w-full flex justify-between">
              <div className="flex flex-col justify-center ">
                <span className=" font-semibold text-xl text-[#ffffff]">
                  {SelectedChat.userName}
                </span>
              </div>
              <div>
                <span className="text-white px-7">
                  <Info />
                </span>
              </div>
            </div>
          </div>
          <div ref={ref} className=" h-full overflow-y-scroll">
            {Chats?.message?.map((chat, index) => (
              <Message
                key={index}
                message={chat.messageDetails.Text}
                user={chat.messageDetails.user}
                createdAt={chat.messageDetails.createdAt}
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
