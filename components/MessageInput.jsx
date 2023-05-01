import { Send } from "@/public/Icons";
import React, { useState } from "react";
import { auth, db } from "@/Firebase/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
function MessageInput() {
  const { data } = useContext(SelectedChatContext);
  const [newMessge, setNewMessage] = useState("");

  const handleAddFriends = async () => {
    const userDocRef = doc(db, "users", data?.uuid)
    const subCollectionRef = collection(userDocRef, "Friends")
    const friendDocRef = doc(subCollectionRef, auth.currentUser.uid);

    const friendDoc = await getDoc(friendDocRef)
    if (friendDoc.exists()) {
      return
    } else {
      await setDoc(friendDocRef, { uuid:auth.currentUser.uid, userName:auth.currentUser.displayName, photoUrl:'' });
    }

  }
  const HandleSendMessages = async (e) => {
    handleAddFriends()
    const Time = new Date();
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
        createdAt: Time,
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
  }



  return (
    <form onSubmit={HandleSendMessages} className=" relative rounded-2xl  w-full flex h-14">
      <input
        value={newMessge}
        placeholder="Write Somthing....."
        onChange={(e) => setNewMessage(e.target.value)}
        className=" bg-[#1A1A1A] rounded-full pl-5 outline-none flex-grow"
        type="text"

      />
      <button className=" absolute right-0 h-14 rounded-full w-14 flex justify-center items-center  bg-[#5b2dc3] text-white">
        <Send />
      </button>
    </form>
  );
}

export default MessageInput;
