import React, { useEffect, useState } from "react";
import CreateNewPost from "./CreateNewPost";
import Post from "./Post";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

function Posts() {
  const [allPost, setAllPost] = useState(null);

  useEffect(() => {
    const q = collection(db, "posts");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setAllPost(posts);
    });
    return () => unsubscribe();
  }, []);
  console.log(allPost);
  return (
    <div className="space-y-7 w-[60%]">
      <CreateNewPost />
      {allPost?.map((post,index) => (
        <Post key={index*23476}/>
      ))}
    </div>
  );
}

export default Posts;
