import "@/styles/globals.css";
import { SelectedChatContextProvider } from "@/context/SelectedChatContext";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase/firebase";
export default function App({ Component, pageProps }) {

  let status = null;
  const getUserStatus = async () => {
    const uuid = JSON.parse(localStorage.getItem("currentUserUid"))
    if(uuid){
      const docRef = doc(db, "users", uuid);
      await updateDoc(docRef, { online: true })
      document.onvisibilitychange = async () => {
        if (document.hidden) {
          status = false;
        } else {
          status = true;
        }
        await updateDoc(docRef, { online: status });
      }
      window.onbeforeunload=async()=>{
        await updateDoc(docRef, { online: false });
      }
    }
  }
  useEffect(() => {
    
    getUserStatus()

  });

  const router = useRouter().pathname;
  return (
    <>
      <SelectedChatContextProvider>
        {router != "/register" && router != "/singin" && <Navbar />}
        <Component {...pageProps} />
      </SelectedChatContextProvider>
    </>
  );
}
