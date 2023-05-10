import { db } from "@/Firebase/firebase";
import { Send } from "@/public/Icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";

function CreateComment({PostId}) {

  const CreateNewcomment = async (e) => {
    e.preventDefault()
    const CurrentUser = JSON.parse(localStorage.getItem('currentUserUid'))
    const comment = e.target[0].value
    const docRef = doc(db, "posts", PostId);
    const docSnap = await getDoc(docRef);
    const comments = docSnap?.data()?.comments;
    await updateDoc(docRef, {
      comments: comments?.length
        ? [...comments, { user: CurrentUser.uid,comment }]
        : [{ user: CurrentUser.uid,comment }],
    });
  };

  return (
    <form onSubmit={CreateNewcomment} className="mx-4 flex bg-[#3a3a3a] rounded-full overflow-hidden pl-4 py-1 my-4">
      <input
        placeholder="Write a comment..."
        className="flex-grow bg-inherit outline-none text-[#e2e2e2] text-sm"
        type="text"
      />
      <button className=" text-[#5D27CD] mr-2">
        <Send />
      </button>
    </form>
  );
}

export default CreateComment;
