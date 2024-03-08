import { useUser } from "../context/UserContext"
import ConnectButton from "../components/ConnectButton";
import DisconnectButton from "../components/DisconnectButton";
import { useMagic } from "../context/MagicProvider";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styles from "../styles/index.module.css";
  
export default function Home() {
    const { user } = useUser()
    const { magic } = useMagic();
    const [didToken, setDidToken] = useState(null);

    useEffect(() => {
        const fetchDidToken = async () => {
            if (magic && user) {
                const token = await magic.user.getIdToken();
                setDidToken(token);
            } else {
                setDidToken(null);
            }
        };
        
        fetchDidToken();
    }, [magic, user]);

    const handleShowUI = async () => {
        try {
          // Try to show the magic wallet user interface
          await magic?.wallet.showUI()
        } catch (error) {
          // Log any errors that occur during the process
          console.error("handleShowUI:", error)
        }
    }
  
    return (
      <div className={styles.mainDiv}>
        <div className={styles.bigText}><u>Home</u></div>
        {user ? (
            <div className="p-2 flex flex-col w-[40vw] mx-auto">
                <DisconnectButton />
            </div>
        ) : (
            <div className="p-2 text-center">
                <ConnectButton />
            </div>
        )}
        { user ? (
            <div className={styles.bigLink} onClick={handleShowUI}>
                Open Wallet
            </div>
        ) : null}
        

        <a href={`/gated?did=${didToken}`}>
            <div className={styles.bigLink}>
                View Gated Content
            </div>
        </a>

        <a href={`${process.env.NEXT_PUBLIC_URL}/validate?did=${didToken}`}>
            <div className={styles.bigLink}>
                Test Validation
            </div>
        </a>
        {didToken ? (
            <div style={{ background: 'white', padding: '16px', margin: 10 }}>
                <QRCode value={`${process.env.NEXT_PUBLIC_URL}/validate?did=${didToken}`} />
            </div>
        ) : null}
      </div>
    );
  }
