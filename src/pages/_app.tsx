import Head from "next/head";
import "../styles/globals.css";
import MagicProvider from "../context/MagicProvider"
import { UserProvider } from "../context/UserContext"

function MyApp({ Component, pageProps }) {
  return (
    <MagicProvider>
        <UserProvider>
            <Head>
            <title>Magic NFT Token Gating</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta
                name="description"
                content="Magic Token Gating"
            />
            </Head>
            <Component {...pageProps} />
        </UserProvider>
    </MagicProvider>
  );
}

export default MyApp;