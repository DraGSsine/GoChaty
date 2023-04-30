import FriendsList from "@/components/FriendsList";
import MessagesForm from "@/components/MessagesForm";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import { useRouter } from "next/router";
function Messages() {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("singin");
      }
    });
  }, []);

  return (
    <section className=" px-5 lg:h-[87vh] bg-[#1A1A1A] lg:flex-row flex flex-col items-center lg:flex gap-2">
    <h1>hello</h1>
      <FriendsList />
      <MessagesForm />
    </section>
  );
}

export default Messages;
