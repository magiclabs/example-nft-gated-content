import { useUser } from "../context/UserContext"
import ConnectButton from "../components/ConnectButton";
import DisconnectButton from "../components/DisconnectButton";
import Link from 'next/link'
import { useMagic } from "../context/MagicProvider";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
  
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
  
    return (
      <div>
        {user ? (
            <div className="p-2 flex flex-col w-[40vw] mx-auto">
                <DisconnectButton />
                <div style={{ background: 'white', padding: '16px' }}>
                    <QRCode value={`${process.env.NEXT_PUBLIC_URL}/validate?did=${didToken}`} />
                </div>
            </div>
        ) : (
            <div className="p-2 text-center">
                <ConnectButton />
            </div>
        )}
        <Link href={`/gated?did=${didToken}`}>View Gated Content</Link>

        <Link href={`${process.env.NEXT_PUBLIC_URL}/validate?did=${didToken}`}>Test Validation</Link>
      </div>
    );
  }
