import { auth } from "@/Firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import SideBar from "@/components/LeftSideBar/SideBar";
import Posts from "@/components/Posts/Posts";
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
    <div className="flex justify-between text-lg font-semibold space-x-4 md:p-10 bg-[#1A1A1A]">
      <SideBar />
      <Posts />
      <div className=" sticky top-0 w-[20%] bg-red-200 h-screen"></div>
    </div>
  );
}
