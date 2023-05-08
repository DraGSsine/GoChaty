import React from "react";
import Image from "next/image";
import photo from "../../public/DefUaltImage.jpg";
import img from "../../../maxresdefault.jpg";
import { Heart } from "@/public/Icons";
function Post() {
  return (
    <>
      {/* component */}
      {/* post card */}
      <div className=" py-6 flex-col bg-[#282828] shadow-lg rounded-lg mx-auto md:max-w-2xl ">
        {/*horizantil margin is just for display*/}
        <div className="flex items-center justify-between px-4 pb-2">
          <div className="flex items-center">
            <Image
              className="md:w-12 md:h-12 w-9 h-9 rounded-full object-cover mr-4 shadow"
              src={photo}
              alt="avatar"
            />
            <div>
              <h2 className="text-xs md:text-sm font-semibold text-gray-400 -mt-1">
                @Ouchen{" "}
              </h2>
              <p className="text-gray-200 text-sm md:text-md font-bold">
                Yassine Ouchne
              </p>
            </div>
          </div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex mx-2 flex-col items-center">
          <div>
            <div className="py-4 mx-2 lg:w-[38rem]">
              <p className="text-sm md:text-md text-gray-200">
                it&rsquo;s just soo amazing how the univery just soo amazing how
                the univery just soo amazing how the univery look like
              </p>
            </div>
            <div>
              <Image
                className="rounded-xl"
                src={img}
                width={630}
                height={700}
                alt="Post Image"
              />
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex mr-2 text-gray-700 text-sm mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                <span>12</span>
              </div>
              <div className="flex mr-2 text-gray-700 text-sm mr-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                <span>8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
