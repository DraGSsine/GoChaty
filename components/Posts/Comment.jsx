import Image from "next/image";
import React, { useState, useEffect } from "react";
import img from "../../public/DefUaltImage.jpg";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/Firebase/firebase";
function Comment({ comment }) {
  const [CommetnContent, setCommetnContent] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", comment.user);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCommetnContent(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-4 mt-4 rounded-2xl p-2 md:p-3 bg-[#3a3a3a]">
      <div className="flex gap-2 items-center">
        <Image
          className="rounded-full max-h-7 max-w-7 md:max-h-8 md:max-w-8"
          src={CommetnContent?.photoUrl}
          width={30}
          height={30}
          alt=""
        />
        <strong className="md:text-sm text-xs text-[#e2e2e2]">
          {CommetnContent?.userName}
        </strong>
      </div>
      <p className="text-sm text-[#e2e2e2] pl-9 ">{comment?.comment}</p>
    </div>
  );
}

export default Comment;
