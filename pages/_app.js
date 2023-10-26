import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import WagmiProvider from "@/utils/WagmiProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import localFont from "@next/font/local";
import { useEffect } from "react";

const surt = localFont({
  src: "../public/fonts/Ayuthaya.ttf",
  variable: "--ayuthaya",
});
export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <StoreProvider>
        <WagmiProvider>
          <Layout>
            <main className={surt.variable + " w-full"}>
              <Component {...pageProps} />
            </main>
          </Layout>
        </WagmiProvider>
      </StoreProvider>
    </GoogleOAuthProvider>
  );
}
