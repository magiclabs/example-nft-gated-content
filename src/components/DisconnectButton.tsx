import { useMagic } from "../context/MagicProvider"
import { useState } from "react"
import { useUser } from "../context/UserContext"
import styles from "../styles/index.module.css"

const DisconnectButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  // Get the initializeWeb3 function from the Web3 context
  const { magic } = useMagic()
  const { fetchUser } = useUser()

  // Define the event handler for the button click
  const handleDisconnect = async () => {
    try {
      setIsLoading(true)
      // Try to disconnect the user's wallet using Magic's logout method
      await magic?.user.logout()
      await fetchUser()

      setIsLoading(false)
    } catch (error) {
      // Log any errors that occur during the disconnection process
      console.log("handleDisconnect:", error)
    }
  }

  // Render the button component with the click event handler
  return (
    <div
      className={styles.bigLink}
      onClick={handleDisconnect}
    >
      {isLoading ? "Disconnecting..." : "Disconnect"}
    </div>
  )
}

export default DisconnectButton
