import React, { useEffect, useState } from "react";
import Image from "next/image";
import { auth, db } from "@/Firebase/firebase";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { UseDate } from "@/Hooks/UseDate";
function Message({ user, message, createdAt }) {
  const { setlastMessage } = useContext(SelectedChatContext);
  const [IsMyMessage, setIsMyMessage] = useState(false);

  const SetMessageSeen = async () => {
    const selectedChat = localStorage.getItem("selectedChat");
    const SelectChat = JSON.parse(selectedChat);
    const combaindId =
      auth?.currentUser?.uid > SelectChat.uuid
        ? auth?.currentUser?.uid + SelectChat.uuid
        : SelectChat.uuid + auth?.currentUser?.uid;

    if (auth.currentUser.uid != user) {
      const docRef = doc(db, "chats", combaindId);
      const docSnap = await getDoc(docRef);

      const UpdateMessages = docSnap.data().message.map((msg) => ({
        messageDetails: {
          ...msg.messageDetails,
          seen: true,
        },
      }));
      await updateDoc(docRef, { message: UpdateMessages });
    }
  };
  useEffect(() => {
    SetMessageSeen();
    auth.currentUser.uid == user ? setIsMyMessage(true) : setIsMyMessage(false);
    setlastMessage({
      user,
      message,
      createdAt,
    });
  }, [user]);
  return (
    <>
      <div className="m-2 flex flex-col ">
        <div className={IsMyMessage ? "MyMessage" : "FriendMessage"}>
          <p>{message}</p>
        </div>
        <span className={`${IsMyMessage&&'self-end'} text-gray-300 text-xs m-1`}>{UseDate(createdAt)}</span>
      </div>
    </>
  );
}

export default Message;
