import { auth, db } from "@/Firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";

function SignOut() {
  const HndleSignOut = async () => {
    const uid = JSON.parse(localStorage.getItem("currentUserUid"))
    const docRef = doc(db, "users", uid.uid);
    await updateDoc(docRef, { online: false });

    localStorage.clear();
    signOut(auth)
      .then(() => {
        router.push("/singin");
      })
      .catch((error) => {
        console.log(error)
      });
  };
  return (
    <div>
      <button onClick={HndleSignOut}>Log out</button>
    </div>
  );
}

export default SignOut;
