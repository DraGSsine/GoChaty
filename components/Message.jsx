import React, { useEffect, useState } from "react";
import Image from "next/image";
import { auth, db } from "@/Firebase/firebase";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
function Message({ user, message, createdAt, combaindId }) {
  const { setlastMessage } = useContext(SelectedChatContext);
  const [IsMyMessage, setIsMyMessage] = useState(false);

  const SetMessageSeen = async () => {
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
      <div className="flex m-2 ">
        <div className={IsMyMessage ? "MyMessage" : "FriendMessage"}>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default Message;
