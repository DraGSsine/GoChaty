import React, { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "@/Firebase/firebase";
import { useContext } from "react";
import { SelectedChatContext } from "@/context/SelectedChatContext";
function Message({user,message,createdAt}) {

  const { setlastMessage } = useContext(SelectedChatContext);
  const [IsMyMessage, setIsMyMessage] = useState(false)
  useEffect(() => {
    auth.currentUser.uid == user ? setIsMyMessage(true) : setIsMyMessage(false)
    setlastMessage({
      user,
      message,
      createdAt
    })
  }, [])
  
  return (
    <>
      <div className="flex m-2 ">
        <div className={IsMyMessage?"MyMessage":"FriendMessage"}>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default Message;
