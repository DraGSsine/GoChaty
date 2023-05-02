import React, { useEffect, useState } from "react";
import Friend from "./Friend";
import { auth } from "@/Firebase/firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
function FriendsList() {
  const [Friends, setFriends] = useState([]);
  const getAllDataFromFireBase = async () => {
    try {

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const friendsCollRef = collection(userDocRef, "Friends");
      onSnapshot(friendsCollRef, (snapshot) => {
        const updatedFriends = [];
        snapshot.forEach(item => updatedFriends.push(item.data()));
        setFriends(updatedFriends);
      })


    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAllDataFromFireBase();
  }, [])
  return (
    <div className="bg-[#282828] h-[8vh] lg:w-4/12 lg:h-full mx-5 w-11/12 rounded-3xl lg:rounded-t-3xl">
      <h1 className=" p-5 hidden lg:inline-flex text-white font-semibold py-4 text-4xl">
        Friends
      </h1>
      <div className=" flex lg:flex-col space-y-3">
        {Friends.map((friend, index) => (
          <Friend
            key={friend.uuid+index}
            userName={friend.userName}
            photoUrl={friend.photoUrl}
            uuid={friend.uuid}
          />
        ))}
      </div>
    </div>
  );
}

export default FriendsList;
