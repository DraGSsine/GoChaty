import React from "react";
import PostLoading from "./PostLoading";

function FeedLoading() {
  return (
    <div className="bg-[#1A1A1A] h-screen py-4 md:px-10">
      <nav className=" w-11/12 bg-[#282828] rounded-3xl h-[8vh] md:h-[13vh] flex items-center md:justify-between md:w-full px-4  mx-auto">
        <div className=" hidden md:block animate-pulse w-20 h-20 rounded-full bg-[#9CA3AF]"></div>
        <div className="ml-36 animate-pulse w-40 h-8 bg-[#9CA3AF] rounded-3xl"></div>
        <div className=" hidden md:block animate-pulse w-60 h-12 bg-[#9CA3AF] rounded-3xl"></div>
      </nav>

      <div className="py-4 flex justify-between">
        <div className="h-[80vh] w-[20%]  hidden md:flex-col md:justify-between md:flex sticky top-0 rounded-3xl bg-[#282828]">
          <div className=" animate-pulse duration-200 transition w-10/12 h-40 rounded-xl mx-auto my-5 bg-[#9CA3AF]"></div>
          <div className=" animate-pulse w-10/12 h-16 rounded-xl mx-auto my-5 bg-[#9CA3AF]"></div>
        </div>
        <div className="flex-grow space-y-4">
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </div>
        <div className="h-[80vh] w-[20%] hidden md:block sticky top-0 rounded-3xl bg-[#282828]">
        <div className=" animate-pulse cursor-pointer w-11/12 h-[200px] bg-[#9CA3AF] m-auto my-5  rounded-3xl flex justify-center items-center">
        <div className=" flex flex-col items-center justify-center gap-1">
            </div>
          </div>
          <div className=" animate-pulse cursor-pointer w-11/12 h-[200px] bg-[#9CA3AF] m-auto my-5  rounded-3xl flex justify-center items-center">
            <div className=" flex flex-col items-center justify-center gap-1">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedLoading;
