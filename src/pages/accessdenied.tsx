import { useSearchParams } from 'next/navigation'
import styles from "../styles/index.module.css";

export default function AccessDenied() {
    const searchParams = useSearchParams()
 
    const msg = searchParams.get('msg')
    return (
      <div className={styles.mainDiv}>
        <div className={styles.bigText}><u>Access Denied</u></div>
        <a href={"/"}>
            <div className={styles.bigLink}>
                Home
            </div>
        </a>
        <p style={{ margin: 10 }}>{msg}</p>
      </div>
    );
  }
