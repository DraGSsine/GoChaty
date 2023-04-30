import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../public/77478b89aee3a9c48af9835a1b0e1db4.png";
import { AddFriendIcon, MarkFriendIcon } from "@/public/Icons";
import { auth, db } from "@/Firebase/firebase";
import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore";

function AddFriend({ userName, uuid, photoUrl }) {
  const [FriendHasBeenAdd, setFriendHasBeenAdd] = useState(false);
  const handleAddFriends = async () => {
    const userDocRef = doc(db, "users", auth.currentUser.uid)
    const subCollectionRef = collection(userDocRef, "Friends")
    const friendDocRef = doc(subCollectionRef, uuid);

    const friendDoc = await getDoc(friendDocRef)
    if (friendDoc.exists()) {
      console.log(`Document with UUID ${uuid} already exists`);
    } else {
      setFriendHasBeenAdd(true)
      await setDoc(friendDocRef, { uuid, userName, photoUrl });
    }

  }
  useEffect(() => {
    const ChekIfIsAfriends=async()=>{
      const userDocRef = doc(db, "users", auth.currentUser.uid)
      const subCollectionRef = collection(userDocRef, "Friends")
      const friendDocRef = doc(subCollectionRef, uuid);
  
      const friendDoc = await getDoc(friendDocRef)
      if (friendDoc.exists()) {
        console.log(`Document with UUID ${uuid} already exists`);
        setFriendHasBeenAdd(true)
      }
    }
    ChekIfIsAfriends()
  }, [])
  
  return (
    <div className=" relative rounded-xl flex items-center overflow-hidden">
      <div>
        <Image
          className="rounded-full"
          src={profile}
          width={60}
          height={60}
          alt="userProfile"
        />
      </div>
      <div className="px-2  flex-grow flex justify-between items-center">
        <div className=" cursor-pointer">
          <h1 className=" text-[#5b2dc3] font-semibold">{userName}</h1>
          <span className=" text-gray-500 text-xs">4 friends manule</span>
        </div>
        <div onClick={handleAddFriends} className=" cursor-pointer">
          {FriendHasBeenAdd ? <MarkFriendIcon /> : <AddFriendIcon />}
        </div>
      </div>
    </div>
  );
}

export default AddFriend;
