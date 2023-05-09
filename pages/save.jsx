import React, { useEffect, useState } from "react";
import Post from "../components/Posts/Post";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/Firebase/firebase";

function Save() {
  const [allPost, setAllPost] = useState(null);

  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem('currentUserUid'))
    const userDocRef = doc(db, "users",uid?.uid);
    const SavesPostRef = collection(userDocRef, "SavedPosts");
    const unsubscribe = onSnapshot(SavesPostRef, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc);
      });
      setAllPost(posts)
    });
    return () => unsubscribe();
  }, []);
    return (
    <div className="space-y-7 px-10 pt-5 min-h-screen w-full bg-[#1A1A1A]">
      {allPost?.map((post,index) => (
        <Post key={post.id} post={post.data().post} PostId={post.id}/>
      ))}
    </div>
  );
}

export default Save;
