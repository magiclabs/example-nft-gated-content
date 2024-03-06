import Link from "next/link";
import { useSearchParams } from 'next/navigation'

export default function AccessDenied() {
    const searchParams = useSearchParams()
 
    const msg = searchParams.get('msg')
    return (
      <div>
        <h2>Access Denied: {msg}</h2>
        <Link href={"/"}>Home</Link>
      </div>
    );
  }
