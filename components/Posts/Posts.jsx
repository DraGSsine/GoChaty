import React, { useEffect, useState } from "react";
import CreateNewPost from "./CreateNewPost";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
import PostLoading from "../LoadingSkeleton/PostLoading";

function Posts() {
  const [allPost, setAllPost] = useState(null);
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("CreateAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc);
      });
      setAllPost(posts)
    });
    return () => unsubscribe();
  }, []);
    return (
    <div className="space-y-7 md:w-[60%]">
      <CreateNewPost />
      {allPost ? allPost?.map((post,index) => (
        <Post key={post.id} post={post.data()} PostId={post.id}/>
      )):<PostLoading/>}
    </div>
  );
}

export default Posts;
