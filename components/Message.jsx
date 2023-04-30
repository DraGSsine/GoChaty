import React, { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "@/Firebase/firebase";
function Message({user,message}) {

  const [IsMyMessage, setIsMyMessage] = useState(false)
  useEffect(() => {
    auth.currentUser.uid == user ? setIsMyMessage(true) : setIsMyMessage(false)
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
