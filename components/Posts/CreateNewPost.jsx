import React, { useEffect, useState } from "react";
import { Send } from "@/public/Icons";
import Image from "next/image";
import EmojiPicker from "emoji-picker-react";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import {  auth, db, storage } from "@/Firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
function CreateNewPost() {
  const [PostText, setPostText] = useState("");
  const [Emoji, setEmoji] = useState(false);
  const CurrentUser = auth.currentUser
  const [PreviewPostImage, setPreviewPostImage] = useState(null);

  const HandleAddPreviewPostImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      setPreviewPostImage(event.target.result);
    });

    reader.readAsDataURL(file);
  };

  const HandlePost = async (e) => {
    e.preventDefault();
    const id = v4();
    const PostTitle = e.target[0].value;
    const PostImage = e.target[2].files[0];
    const PostVideo = e.target[3].files;
    setPostText('')
    setPreviewPostImage(null)
    try {
      let PostImageUrl = null;
      if (PostImage && PreviewPostImage) {
        try {
          const storageRef = ref(storage, id);
          const uploadTask = uploadBytesResumable(storageRef, PostImage);
          const snapshot = await uploadTask;
          const downloadURL = await getDownloadURL(snapshot.ref);
          PostImageUrl = downloadURL;
        } catch (error) {
          console.log(error);
        }
      }
      await setDoc(doc(db, "posts", id), {
        PostTitle,
        PostImageUrl: PostImageUrl || null,
        FullName: JSON.parse(CurrentUser.displayName).fullName,
        Profile: CurrentUser?.photoURL,
        UserName: JSON.parse(CurrentUser.displayName).userName,
        CreateAt:Timestamp.now()
        // PostVideo,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={HandlePost}
      className="px-2 max-w-[48rem] gap-2 flex flex-col bg-[#282828] rounded-3xl mx-auto  md:px-4 py-4"
    >
      <div className="w-full justify-center items-center gap-3 flex">
        <div className="flex-grow">
          <div className=" relative rounded-2xl items-center  w-full flex h-14">
            <input
              value={PostText}
              placeholder="Write Somthing....."
              className=" text-sm placeholder:text-sm pr-32 h-11 sm:h-14 bg-[#1A1A1A] text-white rounded-full pl-5 outline-none flex-grow"
              type="text"
              onChange={(e) => setPostText(e.target.value)}
            />
            <button className=" mr-2 absolute right-0 p-1 sm:p-2 rounded-full  flex justify-center items-center  bg-[#5b2dc3] text-white">
              <Send />
            </button>
            <div className="right-16 absolute flex gap-1">
              {PreviewPostImage && (
                <div className="relative">
                  <div className="max-w-[40px] max-h-[40px]">
                    <Image
                      className="rounded-xl max-h-[44px]"
                      src={PreviewPostImage}
                      width={100}
                      height={100}
                      alt=""
                    />
                  </div>
                  <span
                    onClick={() => setPreviewPostImage(null)}
                    className="absolute cursor-pointer -top-1 -right-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#1A1A1A"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="white"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full justify-center sm:justify-end flex gap-3">
        <div
          onChange={HandleAddPreviewPostImage}
          className="bg-[#1A1A1A] py-1 sm:px-3 px-2 sm:py-2 rounded-xl cursor-pointer"
        >
          <input className="hidden" type="file" id="image" />
          <label
            htmlFor="image"
            className=" cursor-pointer flex gap-1 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#21D99B"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <small className="text-gray-300">Photo</small>
          </label>
        </div>
        <div className="relative">
          <div
            onClick={() => setEmoji(!Emoji)}
            className=" bg-[#1A1A1A] flex py-1 sm:px-3 px-2 sm:py-2 rounded-xl cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#E8BC6C"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            <small className="text-gray-300">Emoji</small>
          </div>
          <div className=" top-14 right-10 absolute">
            {Emoji && (
              <EmojiPicker
                onEmojiClick={(emoji) => setPostText(PostText + emoji.emoji)}
              />
            )}
          </div>
        </div>

        <div
          onChange={HandleAddPreviewPostImage}
          className="bg-[#1A1A1A] py-1 sm:px-3 px-2 sm:py-2 rounded-xl cursor-pointer"
        >
          <input className="hidden" type="file" id="video" />
          <label
            htmlFor="video"
            className=" cursor-pointer flex gap-1 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#5491EA"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>

            <small className="text-gray-300">Video</small>
          </label>
        </div>
      </div>
    </form>
  );
}

export default CreateNewPost;
