import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/Firebase/firebase";
import { UseDateAgo } from "@/Hooks/UseDateAgo";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import PostLoading from "../LoadingSkeleton/PostLoading";

function Post({ post, PostId }) {
  const [ckliked, setCkliked] = useState();
  const [Saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState(null);
  const [ShowComments, setShowComments] = useState(null);
  const [Loading, setLoading] = useState(false);

  const docRef = doc(db, "posts", PostId);
  const Liked = async () => {
    const CurrentUser = auth.currentUser
    const docSnap = await getDoc(docRef);
    const likes = docSnap?.data()?.likes;
    if (likes?.length) {
      const IsLikes = likes.some((element) => element.user == CurrentUser?.uid);
      if (!IsLikes) {
        setCkliked(true);
        await updateDoc(docRef, {
          likes: likes.length
            ? [...likes, { user: CurrentUser?.uid }]
            : [{ user: CurrentUser?.uid }],
        });
      } else {
        setCkliked(false);
        await updateDoc(docRef, {
          likes: likes.filter((like) => like.user != CurrentUser?.uid),
        });
      }
    } else {
      await updateDoc(docRef, {
        likes: docSnap?.data()?.likes
          ? [...docSnap?.data()?.likes, { user: CurrentUser?.uid }]
          : [{ user: CurrentUser?.uid }],
      });
    }
  };

  const GetLikesAndComments = async () => {
    const CurrentUser = JSON.parse(localStorage.getItem("currentUserUid"));
    const docRef = doc(db, "posts", PostId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const unsubscribe = onSnapshot(docRef, (doc) => {
        const likes = doc.data()?.likes;
        setComments(doc?.data()?.comments);
        setCommentsCount(doc?.data()?.comments?.length);

        setLikeCount(likes?.length);
        const Isliked = likes?.some(
          (element) => element.user == CurrentUser?.uid
        );
        if (Isliked) {
          setCkliked(true);
        }
      });
    } else {
      console.log("No such document!");
    }
  };
  const SavePost = async () => {
    const CurrentUser = auth?.currentUser
    setSaved(!Saved);
    const docRef = doc(db, "users", CurrentUser?.uid);
    const savedPostsCollectionRef = collection(docRef, "SavedPosts");
    const Ref = doc(savedPostsCollectionRef, PostId);
    if (!Saved) {
      await setDoc(Ref, {
        post,
      });
    } else {
      await deleteDoc(Ref);
    }
  };
  const CheckIsThePostIsSaved = async () => {
    const CurrentUser = auth.currentUser
    const docRef = doc(db, "users", CurrentUser?.uid);
    const savedPostsCollectionRef = collection(docRef, "SavedPosts");
    const Ref = await getDocs(savedPostsCollectionRef);
    let Posts = [];
    Ref.forEach((element) => {
      Posts.push(element.id);
    });
    const isSaved = Posts.some((id) => id == PostId);
    isSaved ? setSaved(true) : setSaved(false);
  };
  useEffect(() => {
    setLoading(true);
    GetLikesAndComments();
    CheckIsThePostIsSaved();
  }, []);
  return (
    <>
      {Loading ? (
        <div className=" py-5 flex-col bg-[#282828] shadow-lg rounded-3xl mx-auto lg:max-w-[48rem] md:max-w-2xl ">
          <div className="flex items-center justify-between px-4 pb-2">
            <div className="flex items-center">
              <Image
                className="md:w-12 md:h-12 w-9 h-9 rounded-full object-cover mr-4 shadow"
                src={post.Profile}
                alt="avatar"
                width={100}
                height={100}
              />
              <div>
                <h2 className="text-xs md:text-sm font-semibold text-gray-400 -mt-1">
                  @{post.UserName}
                </h2>
                <p className="text-gray-200 text-sm md:text-md font-bold">
                  {post.FullName}
                </p>
              </div>
              <small className=" self-end relative text-xs left-2 -top-1 md:left-6 font-normal text-gray-400">
                {UseDateAgo(post.CreateAt)}
              </small>
            </div>
            <button onClick={SavePost}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={Saved ? "#5b2dc3" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={Saved ? "#5b2dc3" : "#858585"}
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          </div>
          <div className="flex  mx-2 flex-col items-center">
            <div className="w-full px-2">
              <div className="py-4 mx-2">
                <p className="text-sm md:text-md text-gray-200">
                  {post.PostTitle}
                </p>
              </div>
              {post.PostImageUrl && (
                <div>
                  <Image
                    className="rounded-xl w-full"
                    src={post.PostImageUrl}
                    width={630}
                    height={700}
                    alt="Post Image"
                  />
                </div>
              )}
              <div className="mt-4 flex items-center">
                <div className="flex mr-2 text-gray-700 text-sm">
                  <svg
                    onClick={Liked}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={ckliked ? "red" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke={ckliked ? "red" : "#858585"}
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>

                  <span className="text-[#858585] ml-1">{likeCount}</span>
                </div>
                <div
                  onClick={() => setShowComments(!ShowComments)}
                  className="flex text-gray-700 text-sm mr-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#858585"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                  <span className="text-[#858585] ml-1">{commentsCount}</span>
                </div>
              </div>
            </div>
          </div>
          {ShowComments && (
            <>
              <CreateComment PostId={PostId} />
              {comments?.map((comment, index) => (
                <Comment key={index + 9 * 2698} comment={comment} />
              ))}
            </>
          )}
        </div>
      ) : (
        <PostLoading />
      )}
    </>
  );
}

export default Post;
