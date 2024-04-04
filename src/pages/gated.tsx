import { Magic } from '@magic-sdk/admin';
const { Web3 } = require("web3");
import styles from "../styles/index.module.css"
  
export default function Gated() {
    return (
      <div className={styles.mainDiv}>
        <div className={styles.bigText}><u>Welcome to the Gated Content!</u></div>
        <a href={"/"}>
            <div className={styles.bigLink}>
                Home
            </div>
        </a>
      </div>
    );
  }
  
  export async function getServerSideProps(context) {
    const { query } = context;
    const didToken = query.did;
    console.log(didToken)
    

    if (!didToken) {
      return {
        redirect: {
          destination: "/accessdenied?msg=No%20DID%20token%20provided%20(User%20not%20logged%20in)",
          permanent: false,
        },
      };
    }

    // Call magic and validate DID token
    const magic = new Magic(process.env.MAGIC_SECRET_KEY);
    const result = await magic.utils.validateTokenOwnership(
      didToken,
      process.env.NFT_CONTRACT_ADDRESS,
      'ERC1155',
      process.env.NEXT_PUBLIC_RPC_URL,
      process.env.NFT_TOKEN_ID
    )
    if (!result.valid) {
        console.warn(result.message)
        return {
            redirect: {
              destination: "/accessdenied?msg=User%20does%20not%20own%20NFT",
              permanent: false,
            },
        };
    }
  
    return {
      props: {},
    };
  }