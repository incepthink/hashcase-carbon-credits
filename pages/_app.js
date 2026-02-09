import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';

import localFont from '@next/font/local'

const WagmiProvider = dynamic(() => import("@/utils/WagmiProvider"), {
  ssr: false,
});

const surt = localFont({
  src: '../public/fonts/Ayuthaya.ttf',
  variable: '--ayuthaya',
})
export default function App({ Component, pageProps }) {
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
