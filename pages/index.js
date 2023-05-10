import { auth } from "@/Firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import SideBar from "@/components/LeftSideBar/SideBar";
import Posts from "@/components/Posts/Posts";
import RightSideBar from "@/components/RightSideBar/RightSideBar";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("singin");
      }
    });
  }, []);

  return (
    <div className="flex justify-center md:justify-between text-lg font-semibold md:space-x-4 md:px-10 bg-[#1A1A1A]">
      <SideBar />
      <Posts />
      <RightSideBar/>
    </div>
  );
}
