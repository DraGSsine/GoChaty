import { Send } from "@/public/Icons";
import React, { useState } from "react";
import { auth, db } from "@/Firebase/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
function MessageInput() {
  const { data } = useContext(SelectedChatContext);
  const [newMessge, setNewMessage] = useState("");

  const HandleSendMessages = async (e) => {
    const combaindId =
      auth.currentUser.uid > data.uuid
        ? auth.currentUser.uid + data.uuid
        : data.uuid + auth.currentUser.uid;
    e.preventDefault();
    setNewMessage("");
    if (newMessge === "") return;
    const messageDetails = {
      messageDetails: {
        Text: newMessge,
        createdAt: "4:35",
        user: auth.currentUser.uid,
      },
    };
    const docRef = doc(db, "chats", combaindId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(
        docRef,
        { message: arrayUnion(messageDetails) },
        { merge: true }
      );
    } else {
      await setDoc(docRef, { message: arrayUnion(messageDetails) });
    }
  };

  return (
    <form onSubmit={HandleSendMessages} className=" w-full flex h-14">
      <input
        value={newMessge}
        placeholder="Write Somthing....."
        onChange={(e) => setNewMessage(e.target.value)}
        className=" outline-none flex-grow"
        type="text"
      />
      <button className=" w-14 flex justify-center items-center  bg-[#5b2dc3] text-white">
        <Send />
      </button>
    </form>
  );
}

export default MessageInput;
