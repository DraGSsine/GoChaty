import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { signOut } from "firebase/auth";
import {auth} from "@/Firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import SignOut from "@/components/SignOut";
export default function Home() {
  const router = useRouter()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("singin");
      }
    });
  }, []);

  return (
    <div className=" text-lg font-semibold space-x-4 p-10 bg-[#1A1A1A]">
      <Link href="/singin">singin</Link>
      <Link href="/register">register</Link>
      <SignOut/>
    </div>
  );
}
