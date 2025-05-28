import { useEffect, useState } from "react";
import axios from "axios";

export function useChatAvailability() {
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [isChatAvailable, setIsChatAvailable] = useState(false);

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_HTTP_SERVER_URL}/api/conversation/available`,
          {
            headers: { "xi-api-key": process.env.NEXT_PUBLIC_API_KEY || "" },
          }
        );
        setIsChatAvailable(response.data.voice_call_available);
      } catch (error) {
        console.error("Error checking chat availability:", error);
        setIsChatAvailable(false);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 2000);
    return () => clearInterval(interval);
  }, []);

  return { isCheckingStatus, isChatAvailable };
}
