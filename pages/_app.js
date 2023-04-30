import "@/styles/globals.css";
import { SelectedChatContextProvider } from "@/context/SelectedChatContext";
import Navbar from "@/components/Navbar";
export default function App({ Component, pageProps }) {
  return (
    <>
      <SelectedChatContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </SelectedChatContextProvider>
    </>
  );
}
