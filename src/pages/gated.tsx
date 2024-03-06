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

    
    try {
        // Call magic and validate DID token
        const magic = new Magic(process.env.MAGIC_SECRET_KEY);
        await magic.token.validate(didToken);
        const { email, publicAddress: walletAddress } = await magic.users.getMetadataByToken(didToken);
        if (!email || !walletAddress) {
            return {
                redirect: {
                  destination: "/",
                  permanent: false,
                },
            };
        }

        // Check on-chain if user owns NFT by calling contract with web3
        const nftContract = process.env.NFT_CONTRACT_ADDRESS;
        const tokenId = process.env.NFT_TOKEN_ID;
        const web3 = new Web3("https://polygon-rpc.com");
        // Reduced ABI for ERC1155 with just balanceOf 
        const nftContractABI = [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ];
        const contract = new web3.eth.Contract(nftContractABI, nftContract);
        const balance = await contract.methods.balanceOf(walletAddress, tokenId).call()
        console.log('Balance: ', balance)
        if (balance === BigInt(0)) {
            console.log('User does not own NFT: ', walletAddress, tokenId)
            // User doesn't own NFT!
            return {
                redirect: {
                    destination: "/accessdenied?msg=User%20does%20not%20own%20NFT",
                  permanent: false,
                },
            };
        }
    } catch(e){
        console.error(e);
        return {
            redirect: {
              destination: "/accessdenied?msg=Invalid%20DID%20token%20(User%20not%20logged%20in)",
              permanent: false,
            },
        };
    
    }
  
    return {
      props: {},
    };
  }