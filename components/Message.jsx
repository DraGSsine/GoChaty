import React, { useEffect, useState } from "react";
import Image from "next/image";
import { auth, db } from "@/Firebase/firebase";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Message({ user, message, createdAt ,combaindId}) {
  const { setlastMessage } = useContext(SelectedChatContext);
  const [IsMyMessage, setIsMyMessage] = useState(false);
  const SetTheMessageAsSeen = async () => {
    if(auth.currentUser.uid |= user ){
      const docRef = doc(db, "chats", combaindId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        updateDoc(docRef, {
          seen: true,
        });
      }
    }
  }
  useEffect(() => {
    auth.currentUser.uid == user ? setIsMyMessage(true) : setIsMyMessage(false);
    setlastMessage({
      user,
      message,
      createdAt,
    });
    SetTheMessageAsSeen();
  }, []);

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
