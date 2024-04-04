import { Magic } from '@magic-sdk/admin';
const { Web3 } = require("web3");
import type { InferGetServerSidePropsType } from 'next'
import styles from "../styles/index.module.css"

  export default function Page({
    valid,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(valid)
    const validText = valid ? "True" : "False"
    return (
      <div className={styles.mainDiv}>
        <div className={styles.bigText}><u>NFT Validator</u></div>
        <div className={styles.bigText}>Valid: {validText}</div>
        <a href={"/"}>
            <div className={styles.bigLink}>
                Home
            </div>
        </a>
    </div>
    )
  }
  
  export async function getServerSideProps(context) {
    const { query } = context;
    const didToken = query.did;
    console.log(didToken)

    if (!didToken) {
      return {props: {valid: false}};
    }

    
    try {
        // Validate DID token
        const magic = new Magic(process.env.MAGIC_SECRET_KEY);
        const result = await magic.utils.validateTokenOwnership(
            didToken,
            process.env.NFT_CONTRACT_ADDRESS,
            'ERC1155',
            new Web3("https://polygon-rpc.com"),
            process.env.NFT_TOKEN_ID,
        );
        return {props: {valid: result.valid}}
    } catch(e){
        console.error(e);
        return {props: {valid: false}};
    }
  }