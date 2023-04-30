import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { signOut } from "firebase/auth";
import {auth} from "@/Firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const router = useRouter()

  const HndleSignOut = ()=>{
    signOut(auth)
    .then(() => {
      router.push('/singin')
    })
    .catch((error) => {
      // An error happened.
    });
  }
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
      <button onClick={HndleSignOut}>Sign out</button>
    </div>
  );
}
