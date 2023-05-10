import { auth, db } from "@/Firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";

function SignOut() {
  const router = useRouter();
  const HndleSignOut = async () => {
    const uid = JSON.parse(localStorage.getItem("currentUserUid"));
    const docRef = doc(db, "users", uid.uid);
    await updateDoc(docRef, { online: false });

    localStorage.clear();
    signOut(auth)
      .then(() => {
        router.push("/singin");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={HndleSignOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="white"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </button>
    </div>
  );
}

export default SignOut;
