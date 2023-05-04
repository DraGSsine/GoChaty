import "@/styles/globals.css";
import { SelectedChatContextProvider } from "@/context/SelectedChatContext";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
  const router = useRouter().pathname
  return (
    <>
      <SelectedChatContextProvider> 
        {router != '/register' && router != '/singin'&&<Navbar />}
        <Component {...pageProps} />
      </SelectedChatContextProvider>
    </>
  );
}
