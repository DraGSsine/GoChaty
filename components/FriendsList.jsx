import React, { useEffect, useState } from "react";
import Friend from "./Friend";
import { auth } from "@/Firebase/firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

function FriendsList() {
  const [Friends, setFriends] = useState([]);

  const getAllDataFromFireBase = async () => {
    const uid = JSON.parse(localStorage.getItem('currentUserUid'))
    try {
      const userDocRef = doc(db, "users",uid?.uid);
      const friendsCollRef = collection(userDocRef, "Friends");
      onSnapshot(friendsCollRef, (snapshot) => {
        const updatedFriends = [];
        snapshot.forEach((item) => updatedFriends.push(item.data()));
        setFriends(updatedFriends);
      });
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAllDataFromFireBase();
  }, []);
  return (
    <div className="bg-[#282828] overflow-y-scroll items-center h-[8vh] lg:w-4/12 lg:h-screen mx-5 w-11/12 rounded-3xl lg:rounded-t-3xl lg:rounded-b-none">
      <h1 className=" p-5 hidden lg:inline-flex text-white font-semibold py-4 text-4xl">
        Friends
      </h1>

      <div className=" gap-1 px-2 lg:px-0 h-full flex lg:flex-col lg:space-y-3 lg:h-auto rounded-full lg:rounded-none">
        {Friends.map((friend, index) => (
          <Friend
            key={friend.uuid + index}
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
