import { Magic } from "magic-sdk"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
const { Web3 } = require("web3")

type MagicContextType = {
  magic: Magic | null
  web3: typeof Web3 | null
}

const MagicContext = createContext<MagicContextType>({
  magic: null,
  web3: null,
})

export const useMagic = () => useContext(MagicContext)

const MagicProvider = ({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null)
  const [web3, setWeb3] = useState<typeof Web3 | null>(null)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAGIC_API_KEY) {
      console.log("starting to initialize magic")
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY || "", {
        network: {
          rpcUrl: "https://polygon-rpc.com",
          chainId: 137,
        },
        // endpoint: "http://localhost:3014"
        // endpoint: "https://auth.stagef.magic.link",
      })
      console.log("magic", magic)

      setMagic(magic)
      setWeb3(new Web3((magic as any).rpcProvider))
    } else {
      console.error("NEXT_PUBLIC_MAGIC_API_KEY is not set")
    }
  }, [])

  const value = useMemo(() => {
    return {
      magic,
      web3,
    }
  }, [magic, web3])

  return <MagicContext.Provider value={value}>{children}</MagicContext.Provider>
}

export default MagicProvider
